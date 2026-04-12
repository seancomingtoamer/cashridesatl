"use client";

import { useState } from "react";
import {
  CheckCircle,
  Loader2,
  Upload,
  FileCheck,
  Shield,
  Camera,
} from "lucide-react";
import Link from "next/link";

const STRIPE_SPOTLIGHT_LINK = "https://buy.stripe.com/6oU9AT77z7rW2pK4zY2go04";

const ZONES = [
  "Downtown / Midtown",
  "Buckhead",
  "West End / SWATS",
  "East Atlanta / EAV",
  "College Park / East Point",
  "Decatur / Stone Mountain",
  "Sandy Springs / Dunwoody",
  "Marietta / Smyrna",
  "South Fulton",
  "Airport (ATL)",
];

const VEHICLE_TYPES = ["Sedan", "SUV", "Van / Minivan", "Truck", "Luxury", "Other"];

interface DocUpload {
  file: File | null;
  url: string;
  uploading: boolean;
}

export default function DriverVerifyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    serviceZones: [] as string[],
    personalStatement: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<DocUpload>({
    file: null,
    url: "",
    uploading: false,
  });
  const [license, setLicense] = useState<DocUpload>({
    file: null,
    url: "",
    uploading: false,
  });
  const [registration, setRegistration] = useState<DocUpload>({
    file: null,
    url: "",
    uploading: false,
  });
  const [insurance, setInsurance] = useState<DocUpload>({
    file: null,
    url: "",
    uploading: false,
  });
  const [drivingRecord, setDrivingRecord] = useState<DocUpload>({
    file: null,
    url: "",
    uploading: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleZone(zone: string) {
    setForm((prev) => ({
      ...prev,
      serviceZones: prev.serviceZones.includes(zone)
        ? prev.serviceZones.filter((z) => z !== zone)
        : [...prev.serviceZones, zone],
    }));
  }

  async function uploadFile(
    file: File,
    folder: string,
    setter: React.Dispatch<React.SetStateAction<DocUpload>>,
    uploadType: "doc" | "photo" = "doc"
  ) {
    setter((prev) => ({ ...prev, uploading: true }));
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      fd.append("type", uploadType);
      const res = await fetch("/api/upload-doc", { method: "POST", body: fd });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }
      const { url } = await res.json();
      setter({ file, url, uploading: false });
    } catch {
      setter((prev) => ({ ...prev, uploading: false }));
      setErrorMsg("File upload failed. Please try again.");
    }
  }

  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>,
    folder: string,
    setter: React.Dispatch<React.SetStateAction<DocUpload>>,
    uploadType: "doc" | "photo" = "doc"
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setter((prev) => ({ ...prev, file }));
    uploadFile(file, folder, setter, uploadType);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name || !form.email || !form.phone || !form.personalStatement) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (form.serviceZones.length === 0) {
      setErrorMsg("Select at least one service zone.");
      return;
    }
    if (!license.url) {
      setErrorMsg("Please upload your driver's license.");
      return;
    }
    if (!registration.url) {
      setErrorMsg("Please upload your vehicle registration.");
      return;
    }
    if (!insurance.url) {
      setErrorMsg("Please upload your proof of insurance.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          vehicleType: form.vehicleType,
          serviceZones: form.serviceZones,
          personalStatement: form.personalStatement,
          licenseUrl: license.url,
          registrationUrl: registration.url,
          insuranceUrl: insurance.url,
          drivingRecordUrl: drivingRecord.url || undefined,
          photoUrl: profilePhoto.url || undefined,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 px-4">
        <div className="max-w-xl mx-auto py-20 text-center">
          <div className="bg-gradient-to-b from-[#1f1f1f] to-[#161616] rounded-3xl border border-green/20 p-10 shadow-2xl shadow-green/5">
            <CheckCircle className="text-green mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold text-white mb-3">
              Submission Received!
            </h2>
            <p className="text-gray-300 mb-6">
              Sean reviews every submission within 24 hours. Once your docs
              are approved, your Driver Spotlight goes live on the roster.
            </p>
            <div className="bg-[#0a0a0a] rounded-xl p-5 border border-green/30 mb-6">
              <p className="text-white font-semibold mb-1">
                Lock in your $5/mo Spotlight placement now
              </p>
              <p className="text-gray-400 text-xs mb-4">
                Founding rate. Subscription activates your featured listing the
                moment Sean approves your docs.
              </p>
              <a
                href={`${STRIPE_SPOTLIGHT_LINK}?prefilled_email=${encodeURIComponent(form.email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green text-black font-bold py-3 px-6 rounded-xl hover:bg-green/90 transition-colors"
              >
                Subscribe to Driver Spotlight — $5/mo
              </a>
            </div>
            <Link
              href="/"
              className="text-green hover:underline text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green/10 text-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield size={16} />
            Secure Document Upload
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Get <span className="text-green">Verified</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Upload your documents to join Atlanta&apos;s verified driver
            network. Takes about 10 minutes.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pb-20">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-gradient-to-b from-[#1f1f1f] to-[#161616] rounded-3xl border border-green/20 overflow-hidden shadow-2xl shadow-green/5"
        >
          <div className="bg-green/10 px-8 py-4 border-b border-green/20">
            <span className="text-green font-bold text-sm uppercase tracking-wider">
              Driver Verification Portal
            </span>
          </div>

          <div className="px-8 py-8 space-y-6">
            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Your Info</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
                    placeholder="(404) 555-1234"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Vehicle Type
                </label>
                <select
                  value={form.vehicleType}
                  onChange={(e) =>
                    setForm({ ...form, vehicleType: e.target.value })
                  }
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green/50 transition-colors"
                >
                  <option value="">Select vehicle</option>
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Zones */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Service Zones *
              </label>
              <div className="flex flex-wrap gap-2">
                {ZONES.map((zone) => (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => toggleZone(zone)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                      form.serviceZones.includes(zone)
                        ? "bg-green/20 border-green/40 text-green"
                        : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/20"
                    }`}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Photo (optional) */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Camera size={20} className="text-green" />
                Profile Photo
                <span className="text-gray-500 text-sm font-normal">(optional)</span>
              </h3>
              <FileUploadField
                label="Your headshot for the public roster"
                doc={profilePhoto}
                onChange={(e) => handleFileChange(e, "photos", setProfilePhoto, "photo")}
              />
            </div>

            {/* Document Uploads */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <Upload size={20} className="text-green" />
                Required Documents
              </h3>
              <p className="text-gray-400 text-sm">
                Upload clear photos or PDFs of each document. Max 10 MB each.
              </p>

              <FileUploadField
                label="Driver's License *"
                doc={license}
                onChange={(e) => handleFileChange(e, "license", setLicense)}
              />
              <FileUploadField
                label="Vehicle Registration *"
                doc={registration}
                onChange={(e) =>
                  handleFileChange(e, "registration", setRegistration)
                }
              />
              <FileUploadField
                label="Proof of Insurance *"
                doc={insurance}
                onChange={(e) => handleFileChange(e, "insurance", setInsurance)}
              />
              <FileUploadField
                label="Driving Record (optional)"
                doc={drivingRecord}
                onChange={(e) =>
                  handleFileChange(e, "driving-record", setDrivingRecord)
                }
              />
            </div>

            {/* Personal Statement */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Personal Statement *
              </label>
              <p className="text-gray-500 text-xs mb-2">
                Tell riders why you drive and what makes you a great choice.
                This shows on your public profile.
              </p>
              <textarea
                required
                value={form.personalStatement}
                onChange={(e) =>
                  setForm({ ...form, personalStatement: e.target.value })
                }
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors resize-none"
                placeholder="I've been driving in Atlanta for 5 years. I know every shortcut in Buckhead and the Westside..."
              />
            </div>

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-green hover:bg-green-dark text-black font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Submitting...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Submit for Verification
                </>
              )}
            </button>

            <p className="text-gray-500 text-xs text-center">
              Your documents are stored securely and only reviewed by our team.
              Phone and email are never shown publicly.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
}

function FileUploadField({
  label,
  doc,
  onChange,
}: {
  label: string;
  doc: DocUpload;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      {doc.url ? (
        <div className="flex items-center gap-2 text-green text-sm">
          <FileCheck size={16} />
          <span>Uploaded</span>
          <span className="text-gray-500 truncate max-w-[200px]">
            {doc.file?.name}
          </span>
        </div>
      ) : doc.uploading ? (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Loader2 size={16} className="animate-spin" />
          <span>Uploading...</span>
        </div>
      ) : (
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={onChange}
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green/10 file:text-green hover:file:bg-green/20 file:cursor-pointer cursor-pointer"
        />
      )}
    </div>
  );
}
