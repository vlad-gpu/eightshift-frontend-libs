/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, TabPanel, Dashicon } from '@wordpress/components';
import { ColumnResponsiveTabContent } from './column-responsive-tab-content';

export const ColumnOptions = ({ attributes, actions }) => {
  const {
    width,
    offset,
    hide,
  } = attributes;

  const {
    onChangeWidthLarge,
    onChangeHideLarge,
    onChangeOffsetLarge,

    onChangeWidthDesktop,
    onChangeHideDesktop,
    onChangeOffsetDesktop,

    onChangeWidthTablet,
    onChangeHideTablet,
    onChangeOffsetTablet,

    onChangeWidthMobile,
    onChangeHideMobile,
    onChangeOffsetMobile,
  } = actions;

  return (
    <PanelBody title={__('Column Details', 'eightshift-boilerplate')}>
      <TabPanel
        className="custom-button-tabs"
        activeClass="button button-primary"
        tabs={[
          {
            name: 'large',
            title: <Dashicon icon="desktop" />,
            className: 'tab-large button button-secondary custom-button-with-icon',
          },
          {
            name: 'desktop',
            title: <Dashicon icon="laptop" />,
            className: 'tab-desktop button button-secondary custom-button-with-icon',
          },
          {
            name: 'tablet',
            title: <Dashicon icon="tablet" />,
            className: 'tab-tablet button button-secondary custom-button-with-icon',
          },
          {
            name: 'mobile',
            title: <Dashicon icon="smartphone" />,
            className: 'tab-mobile button button-secondary custom-button-with-icon',
          },
        ]
        }
      >
        {(tab) => (
          <Fragment>
            {tab.name === 'large' && (
              <Fragment>
                <br />
                <strong className="notice-title">{__('Large Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control large screens options.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={width.large}
                  onChangeWidth={onChangeWidthLarge}
                  hide={hide.large}
                  onChangeHide={onChangeHideLarge}
                  offset={offset.large}
                  onChangeOffset={onChangeOffsetLarge}
                />
              </Fragment>
            )}
            {tab.name === 'desktop' && (
              <Fragment>
                <br />
                <strong className="notice-title">{__('Desktop Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control desktop screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={width.desktop}
                  onChangeWidth={onChangeWidthDesktop}
                  hide={hide.desktop}
                  onChangeHide={onChangeHideDesktop}
                  offset={offset.desktop}
                  onChangeOffset={onChangeOffsetDesktop}
                />
              </Fragment>
            )}
            {tab.name === 'tablet' && (
              <Fragment>
                <br />
                <strong className="notice-title">{__('Tablet Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control tablet screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={width.tablet}
                  onChangeWidth={onChangeWidthTablet}
                  hide={hide.tablet}
                  onChangeHide={onChangeHideTablet}
                  offset={offset.tablet}
                  onChangeOffset={onChangeOffsetTablet}
                />
              </Fragment>
            )}
            {tab.name === 'mobile' && (
              <Fragment>
                <br />
                <strong className="notice-title ">{__('Mobile Layout Options', 'eightshift-boilerplate')}</strong>
                <p>{__('This options will only control mobile screens options. If nothing is set, parent options will be used.', 'eightshift-boilerplate')}</p>
                <br />
                <ColumnResponsiveTabContent
                  width={width.mobile}
                  onChangeWidth={onChangeWidthMobile}
                  hide={hide.mobile}
                  onChangeHide={onChangeHideMobile}
                  offset={offset.mobile}
                  onChangeOffset={onChangeOffsetMobile}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </TabPanel>
    </PanelBody>
  );
};
