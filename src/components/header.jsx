import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ExtendedNav,
  Header as HeaderUSWDS,
  NavMenuButton,
  Title,
} from '@trussworks/react-uswds';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { useTranslation } from 'react-i18next';
import { Link, NavDropDown } from '.';
import Banner from './banner';
import ctoLogoShortform from '../images/logos/cto_logo_shortform_dark.png';
import { header as links } from '../constants/links';
import '@reach/skip-nav/styles.css';

function Header({ slug }) {
  const { t } = useTranslation();

  /* menu expansion in mobile view */
  const [expanded, setExpanded] = useState(false);
  const onClick = () => setExpanded((prevExpanded) => !prevExpanded);

  /* dynamically store dropdowns in navigation bar */
  const dropdowns = [];
  const dropdownLinks = links.navDropdowns;
  const constFileLength = dropdownLinks.length;
  const dropdownLabels = t('header.nav.dropdowns');
  const translationFileLength = dropdownLabels.length;
  const length = translationFileLength > constFileLength
    ? constFileLength
    : translationFileLength;
  /* take shorter length in case there is missing dropdowns in
      `../constants/links.js` (constants file) or `../locales/` (translation files) */
  if (translationFileLength !== constFileLength) {
    console.error(
      'Different number of dropdowns in /src/constants/link.js and dropdown labels in /src/locales\n',
      `${constFileLength} dropdown${
        constFileLength > 1 ? 's' : ''
      } in /src/constants/link.js\n`,
      `${translationFileLength} dropdown${
        translationFileLength > 1 ? 's' : ''
      } in /src/locales`,
    );
  }
  // eslint-disable-next-line array-callback-return
  dropdownLinks.map((_, i) => {
    if (i < length) {
      const navDropdownLinks = dropdownLinks[i];
      const navDropdownLinksLength = navDropdownLinks.length;
      const navDropdownLinkLabels = t('header.nav.dropdowns')[i].simpleLinks;
      const navDropdownLinkLabelsLength = navDropdownLinkLabels.length;
      const navDropdownLength = navDropdownLinksLength > navDropdownLinkLabelsLength
        ? navDropdownLinkLabelsLength
        : navDropdownLinksLength;
      /* take shorter length in case there is a missing link
        in `../constants/links.js` (constants file) or label in `../locales/` (translation files) */
      if (navDropdownLinksLength !== navDropdownLinkLabelsLength) {
        console.error(
          `Different number of links in /src/constants/link.js and link labels in /src/locales for dropdown ${
            i + 1
          }\n`,
          'Links: ',
          navDropdownLinks,
          '\n',
          'Link labels: ',
          navDropdownLinkLabels,
          '\n',
        );
      }
      dropdowns.push(
        navDropdownLinks.map(
          (element, j) => j < navDropdownLength && (
          <Link to={element} key={element}>
            {navDropdownLinkLabels[j]}
          </Link>
          ),
        ),
      );
    } else dropdowns.push([]);
  });

  /* dynamically store parent links */
  const parentLinks = links.parent;
  const parentLinksLength = parentLinks.length;
  const parentLinksLabels = t('header.nav.parentLinks');
  const parentLinksLabelsLength = parentLinksLabels.length;
  const parentLength = parentLinksLength > parentLinksLabelsLength
    ? parentLinksLabelsLength
    : parentLinksLength;
  // take shorter length if is missing link in parentLinks or missing label in translation file
  if (parentLinksLength !== parentLinksLabelsLength) {
    console.error(
      'Different number of parent links in /src/constants/link.js and parent labels in /src/locales\n',
      'Links: ',
      parentLinks,
      '\n',
      'Labels: ',
      parentLinksLabels,
      '\n',
    );
  }
  const parentLinkItems = parentLinks.map(
    (element, i) => i < parentLength && (
    <Link to={element} variant="nav" key={element}>
      <span>{parentLinksLabels[i]}</span>
    </Link>
    ),
  );

  return (
    <HeaderUSWDS extended>
      {/* <Router> */}
      <SkipNavLink />
      <Banner slug={slug}>{t('header.banner')}</Banner>
      <div className="usa-navbar">
        <div className="header__logo-title">
          <img className="header__logo" src={ctoLogoShortform} alt="NYC CTO" />
          <Title>{t('title')}</Title>
        </div>
        <NavMenuButton onClick={onClick} label="Menu" />
      </div>
      <ExtendedNav
        primaryItems={NavDropDown(dropdowns).concat(parentLinkItems)}
        secondaryItems={[]}
        mobileExpanded={expanded}
        onToggleMobileNav={onClick}
        role="navigation"
      />
      <SkipNavContent />
    </HeaderUSWDS>
  );
}

Header.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default Header;
