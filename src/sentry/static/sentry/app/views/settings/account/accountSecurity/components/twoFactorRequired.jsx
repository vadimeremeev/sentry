import React from 'react';
import styled from 'react-emotion';

import {capitalize} from 'lodash';
import Alert from 'app/components/alert';
import AsyncComponent from 'app/components/asyncComponent';
import space from 'app/styles/space';

let StyledAlert = styled(Alert)`
  margin: ${space(3)} 0;
`;

class TwoFactorRequired extends AsyncComponent {
  getEndpoints() {
    return [['organizations', '/organizations/']];
  }

  renderBody() {
    let orgsRequire2FA = this.state.organizations
      .filter(org => org.require2FA)
      .map(({name}) => capitalize(name));
    let multipleOrgs = orgsRequire2FA.length > 1;
    let formattedNames = [
      orgsRequire2FA.slice(0, -1).join(', '),
      orgsRequire2FA.slice(-1)[0],
    ].join(orgsRequire2FA.length < 2 ? '' : ' and ');

    if (!orgsRequire2FA.length) {
      return null;
    }

    return (
      <div>
        {multipleOrgs ? (
          <StyledAlert
            className="require-2fa"
            type="error"
            icon="icon-circle-exclamation"
          >
            {`The ${formattedNames} organizations require all members to enable
              two-factor authentication. You need to enable two-factor
              authentication to access projects under these organizations.`}
          </StyledAlert>
        ) : (
          <StyledAlert
            className="require-2fa"
            type="error"
            icon="icon-circle-exclamation"
          >
            {`The ${formattedNames} organization requires all members to enable
              two-factor authentication. You need to enable two-factor
              authentication to access projects under this organization.`}
          </StyledAlert>
        )}
      </div>
    );
  }
}

export default TwoFactorRequired;
