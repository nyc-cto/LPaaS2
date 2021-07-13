import React, { useState } from "react";
import {
  ExtendedNav,
  GridContainer,
  Header as HeaderUSWDS,
  Menu,
  NavDropDownButton,
  NavMenuButton,
  Title,
} from "@trussworks/react-uswds";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import { useTranslation } from "react-i18next";

import { Banner, LanguageSwitcher, Link } from ".";

import "@reach/skip-nav/styles.css"; 

function Header({ slug }) {
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
  const testMenuItemsOne = [
    <Link to="/link-one" key="one">
      {t("nav.dropdownOne.simpleLinkOne")}
    </Link>,
    <Link to="/link-two" key="two">
      {t("nav.dropdownOne.simpleLinkTwo")}
    </Link>,
  ];

  /* second dropdown items */
  const testMenuItemsTwo = [
    <Link to="/link-three" key="one">
      {t("nav.dropdownTwo.simpleLinkThree")}
    </Link>,
    <Link to="/link-four" key="two">
      {t("nav.dropdownTwo.simpleLinkFour")}
    </Link>,
  ];

  /* links above search button */
  const secondaryLinks = [];

  const navBarItems = [
    <React.Fragment>
      <NavDropDownButton
        onToggle={() => {
          /* TODO: should it extend on ENTER or BUTTON_DOWN? */
          setIsOpen2(false);
          setIsOpen1((prevOpen) => !prevOpen);
        }}
        menuId="testDropDownOne"
        isOpen={isOpen1}
        label={t("nav.dropdownOne.label")}
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
          /* TODO: should it extend on ENTER or BUTTON_DOWN? */
          setIsOpen1(false);
          setIsOpen2((prevOpen) => !prevOpen);
        }}
        menuId="testDropDownTwo"
        isOpen={isOpen2}
        label={t("nav.dropdownTwo.label")}
        // isCurrent={true} // TODO: update later
      />
      <Menu
        key="two"
        items={testMenuItemsTwo}
        isOpen={isOpen2}
        id="testDropDownTwo"
      />
    </React.Fragment>,
    <Link variant="nav" to="/three" key="three">
      <span>{t("nav.parentOne")}</span>
    </Link>,
  ];

  return (
    <HeaderUSWDS extended={true}>
      {/* <Router> */}
      <SkipNavLink />
      <Banner slug={slug}>{t("banner")}</Banner>
      <GridContainer>{/* <LanguageSwitcher slug={slug} /> */}</GridContainer>

      <div className="usa-navbar">
        <Title>{t("title")}</Title>
        <NavMenuButton onClick={onClick} label="Menu" />
      </div>
      <ExtendedNav
        primaryItems={navBarItems}
        secondaryItems={secondaryLinks}
        mobileExpanded={expanded}
        onToggleMobileNav={onClick}
        role="navigation"
      ></ExtendedNav>
      <SkipNavContent />
    </HeaderUSWDS>
  );
}

export default Header;
