import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ExtendedNav,
  GovBanner,
  Header as HeaderUSWDS,
  Menu,
  NavDropDownButton,
  NavMenuButton,
  Search,
  Title,
} from "@trussworks/react-uswds";
import { useTranslation } from "react-i18next";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";

import LanguageSwitcher from "./LanguageSwitcher";
import Link from "./Link";

import "../styles/Header.css";
import "@reach/skip-nav/styles.css"; // this will show/hide the SkipNavLink on focus

const Header = () => {
  const { t, i18n } = useTranslation();

  /* switching between languages in the government banner */
  const govBannerLang = {
    /* TODO: might want to keep in a separate file */
    en: "english",
    es: "spanish",
  };

  /* menu expansion */
  const [expanded, setExpanded] = useState(false);
  const onClick = () => setExpanded((prevExpanded) => !prevExpanded);

  /* nav dropdown expansions */
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  /* first dropdown items */

  // TODO: was trying to have the links be dynamically created instead of hard-coding but whenever I tried to assign the length it resulted in undefined after the 2nd refresh
  // const testMenuItemsOneLinks = t('header.nav.dropdown')[0]['simpleLink'];
  // const testMenuItemsOneLength = testMenuItemsOneLinks.length; // assigning results in undefined
  // console.log(testMenuItemsOneLinks);
  // console.log(testMenuItemsOneLength);
  // const testMenuItemsOneLength = t('header.nav.dropdown')[0]['simpleLink'].length; // assigning results in undefined
  // const testMenuItemsOne = Array.from({ length: testMenuItemsOneLength }, (_, i) => {
  //     return (
  //       <Link to={"link" + i} key={i}>
  //         {testMenuItemsOneLinks[i]}
  //       </Link>
  //     );
  //   });

  /* TODO: try to dynamically create */
  const testMenuItemsOne = [
    <Link to="linkOne" key="one">
      {t("header.nav.dropdown.0.simpleLink.0")}
    </Link>,
    <Link to="linkTwo" key="two">
      {t("header.nav.dropdown.0.simpleLink.1")}
    </Link>,
  ];

  /* TODO: try to dynamically create */
  /* second dropdown items */
  const testMenuItemsTwo = [
    <Link to="#linkThree" key="one">
      {t("header.nav.dropdown.1.simpleLink.0")}
    </Link>,
    <Link to="#linkFour" key="two">
      {t("header.nav.dropdown.1.simpleLink.1")}
    </Link>,
  ];

  /* TODO: try to dynamically create */
  /* links above search button */
  const secondaryLinks = [
    <Link to="#linkFive" key="one">
      {t("header.secondaryLink.0")}
    </Link>,
    <Link to="#linkSix" key="two">
      {t("header.secondaryLink.1")}
    </Link>,
  ];

  const navBarItems = [
    <React.Fragment>
      <NavDropDownButton
        onToggle={() => {
          setIsOpen2(false);
          setIsOpen1((prevOpen) => !prevOpen);
        }}
        menuId="testDropDownOne"
        isOpen={isOpen1}
        label={t("header.nav.dropdown.0.label")}
        // isCurrent={true} // TODO: update later
      />
      <Menu
        key="one"
        items={testMenuItemsOne}
        isOpen={isOpen1}
        id="testDropDownOne"
      />
    </React.Fragment>,
    <React.Fragment>
      <NavDropDownButton
        onToggle={() => {
          setIsOpen1(false);
          setIsOpen2((prevOpen) => !prevOpen);
        }}
        menuId="testDropDownTwo"
        isOpen={isOpen2}
        label={t("header.nav.dropdown.0.label")}
        // isCurrent={true} // TODO: update later
      />
      <Menu
        key="two"
        items={testMenuItemsTwo}
        isOpen={isOpen2}
        id="testDropDownTwo"
      />
    </React.Fragment>,
    <Link variant="nav" to="#three" key="three">
      <span>{t("header.nav.parent.0")}</span>
    </Link>,
  ];

  return (
    <HeaderUSWDS extended={true}>
      <Router>
        <SkipNavLink />
        <GovBanner
          language={govBannerLang[i18n.language]}
          translate="yes"
          role="banner"
        />
        <LanguageSwitcher />
        <div className="usa-navbar">
          <Title>{t("header.title")}</Title>
          <NavMenuButton onClick={onClick} label="Menu" />
        </div>
        <ExtendedNav
          primaryItems={navBarItems}
          secondaryItems={secondaryLinks}
          mobileExpanded={expanded}
          onToggleMobileNav={onClick}
          role="navigation"
        >
          <Search
            id="search"
            className="header__search"
            onSubmit={() => {}}
            size="small"
          />
        </ExtendedNav>
        <SkipNavContent />
      </Router>
    </HeaderUSWDS>
  );
};

export default Header;
