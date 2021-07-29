import React from 'react';

import { Grid, GridContainer } from '@trussworks/react-uswds';
import PropTypes from 'prop-types';

function Graphic({ graphics }) {
  return (
    <section className="usa-graphic-list usa-section usa-section--dark">
      <GridContainer>
        <Grid>
          <Grid row gap className="usa-graphic-list__row">
            {graphics
            && graphics.map((graphic) => (
              <Grid
                className="usa-media-block"
                row
                gap
                desktop={{ col: 6 }}
                key={graphic.heading}
              >
                <Grid className="graphic__image-container" tablet={{ col: 3 }} desktop={{ col: 5 }}>
                  {graphic.image && (
                  <img
                    className="graphic__image--circle usa-media-block__img"
                    src={graphic.image}
                    alt={graphic.imageDescription}
                  />
                  )}
                </Grid>
                <Grid className="usa-media-block__body" tablet={{ col: 9 }} desktop={{ col: 7 }}>
                  {graphic.heading && (
                  <h2 className="usa-graphic-list__heading">
                    {graphic.heading}
                  </h2>
                  )}
                  {graphic.text && (
                  <p className="usa-prose">{graphic.text}</p>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </GridContainer>
    </section>
  );
}

Graphic.propTypes = {
  graphics: PropTypes.node.isRequired,
};

export default Graphic;
