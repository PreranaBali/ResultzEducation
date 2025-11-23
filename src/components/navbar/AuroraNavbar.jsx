// AuroraNavbar.jsx
import StaggeredMenu from "../../pages/utils/StaggeredMenu";
import logo from "../../assets/logo/logo.svg";

export default function AuroraNavbar() {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
    { label: "Chat", ariaLabel:"communicate", link:"/Chat"},
    { label: "Courses", ariaLabel: "Learn with us", link: "/courses" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];

  return (
    // fixed like a real navbar; no full-height wrapper
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 24px" }}>
        <StaggeredMenu
  isFixed={true}
  position="right"
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
  menuButtonColor="#ffffff"
  openMenuButtonColor="#ffae00"
  changeMenuColorOnOpen={true}
  colors={["#ff7b00", "#ffae00"]}    // deep black layers
  logoUrl={logo}
  accentColor="#ff7b00"                        // orange
  onMenuOpen={() => (document.body.style.overflow = "hidden")}
  onMenuClose={() => (document.body.style.overflow = "")}
/>


      </div>
      {/* spacer so content doesn't hide under the fixed bar */}
      <div style={{ height: 5}} />
    </div>
  );
}
