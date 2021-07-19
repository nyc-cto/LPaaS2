/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import {
  Button, Grid, Menu, NavDropDownButton,
} from '@trussworks/react-uswds';
import { useTranslation } from 'react-i18next';
import FeatherIcon from 'feather-icons-react';
import { languages } from '../constants/languages';

function LanguageSelector({ slug }) {
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (langKey) => {
    i18n.changeLanguage(langKey);
    navigate(`/${langKey}/${slug}`);
  };

  const languageMenuItems = languages.map((language) => (
    <div
      className={
        languages.length <= 5
          ? 'banner__language-selector-item'
          : language.isRtoL
            ? 'banner__language-selector-item--RtoL'
            : 'banner__language-selector-item--LtoR'
      }
    >
      <Button
        onClick={() => {
          handleClick(language.langKey);
        }}
        type="button"
        unstyled
        key={language.langKey}
      >
        {language.lang}
      </Button>
    </div>
  ));
  return (
    <div className="banner__language-selector">
      {languageMenuItems.length <= 5 ? (
        <Grid className="banner__language-selector-button-group">
          {languageMenuItems}
        </Grid>
      ) : (
        <Grid className="language-selector__nav">
          <NavDropDownButton
            className="language-selector__nav-button"
            onToggle={() => {
              setIsOpen((prevOpen) => !prevOpen);
            }}
            menuId="language-selector"
            isOpen={isOpen}
            label={(
              <div className="banner__language-selector-label font-heading-xs">
                <FeatherIcon icon="globe" size={16} />
                <p>Language</p>
              </div>
            )}
          />
          <Menu
            id="language-selector"
            items={languageMenuItems}
            isOpen={isOpen}
          />
        </Grid>
      )}
    </div>
  );
}

LanguageSelector.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default LanguageSelector;
