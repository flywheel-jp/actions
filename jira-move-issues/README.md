# Jira Move Issues

> Move issue statuses based on the given transitions.

## Usage

```yaml
on:
  pull_request:
    types: [closed]
jobs:
  move-jira-issues:
    name: Move Jira issues
    if: github.event.pull_request.merged
    runs-on: ubuntu-latest
    steps:
      - uses: flywheel-jp/actions/jira-find-transitions@main
        id: find
        with:
          jira_base_url: ${{ secrets.JIRA_BASE_URL }}
          jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
          jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
          string: ${{ github.event.pull_request.body }}
      - uses: flywheel-jp/actions/jira-move-issues@main
        with:
          jira_base_url: ${{ secrets.JIRA_BASE_URL }}
          jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
          jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
          transitions: ${{ steps.find.outputs.transitions }}
```
