import UserSignupForm from "../_components/UserSignupForm";

// meta data
export const metadata = {
  title: "DXB Stag Party - Sign Up",
  description:
    "Read the DXB Stag Party privacy policy to learn how we collect, use, and protect your personal information.",
};

export default function page() {
  return <UserSignupForm />;
}
