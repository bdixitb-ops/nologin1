import CrossDeviceSharing from "@/components/CrossDeviceSharing";

export const metadata = {
  title: {
    absolute: "Cross Device Sharing — Transfer Files & Text Between Any Devices | NoLogin",
  },
  description:
    "Share files and text across any devices instantly — phone to laptop, Android to Mac, any browser to any browser. No login, no app, no cable, no account needed.",
  alternates: {
    canonical: "https://www.nologin.in/cross-device-sharing",
  },
  openGraph: {
    title: "Cross Device Sharing — Transfer Files & Text Between Any Devices | NoLogin",
    description:
      "Share files and text across any devices instantly — phone to laptop, Android to Mac, any browser to any browser. No login, no app, no cable, no account needed.",
    url: "https://www.nologin.in/cross-device-sharing",
  },
};

export default function CrossDeviceSharingPage() {
  return <CrossDeviceSharing />;
}
