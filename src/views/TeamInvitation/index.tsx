import React from 'react';

import { Typography } from '@material-ui/core';

import Page from 'src/components/Page';
import { MembersProvider } from 'src/providers/members';
import MembersList from 'src/views/TeamInvitation/MembersList';

function TeamInvitationPage() {
  return (
    <Page title="Team Invitation">
      <Typography component="h2" gutterBottom variant="h2">
        Team Invitation
      </Typography>
      <MembersProvider>
        <MembersList />
      </MembersProvider>
    </Page>
  );
}

export default TeamInvitationPage;
