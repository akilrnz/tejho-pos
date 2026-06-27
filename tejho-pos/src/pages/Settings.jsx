import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Settings() {
  const [businessName, setBusinessName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [wholesaleThreshold,
    setWholesaleThreshold] =
    useState(20);

  const [partnerThreshold,
    setPartnerThreshold] =
    useState(200);

  const [settingsId, setSettingsId] =
    useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("businessinfo")
      .select("*")
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setSettingsId(data.id);
    setBusinessName(
      data.business_name || ""
    );
    setAddress(data.address || "");
    setPhone(data.phone || "");

    setWholesaleThreshold(
      data.wholesale_threshold || 20
    );

    setPartnerThreshold(
      data.partner_threshold || 200
    );
  };

  const saveSettings = async () => {
    const { error } = await supabase
      .from("businessinfo")
      .update({
        business_name: businessName,
        address,
        phone,
        wholesale_threshold:
          Number(wholesaleThreshold),
        partner_threshold:
          Number(partnerThreshold),
      })
      .eq("id", settingsId);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Settings saved successfully!"
    );
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      {/* Business Info */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Business Information
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block mb-1">
              Business Name
            </label>

            <input
              type="text"
              value={businessName}
              onChange={(e) =>
                setBusinessName(
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">
              Address
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">
              Phone Number
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

        </div>

      </div>

      {/* Thresholds */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          Pricing Thresholds
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block mb-1">
              Wholesale Threshold (kg)
            </label>

            <input
              type="number"
              value={wholesaleThreshold}
              onChange={(e) =>
                setWholesaleThreshold(
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">
              Partner Threshold (kg)
            </label>

            <input
              type="number"
              value={partnerThreshold}
              onChange={(e) =>
                setPartnerThreshold(
                  e.target.value
                )
              }
              className="w-full border rounded p-2"
            />
          </div>

        </div>

      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Save Settings
      </button>

    </div>
  );
}

export default Settings;