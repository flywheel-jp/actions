# Jira Find Transitions

> Extract transition declarations from string.

## Usage

```yaml
name: Jira Find Transitions Example
on: pull_request
jobs:
  sample:
    runs-on: ubuntu-latest
    name: Sample
    steps:
      - uses: flywheel-jp/actions/jira-find-transitions@master
        id: transitions
        with:
          jira_base_url: ${{ secrets.JIRA_BASE_URL }}
          jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
          jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
          string: ${{ github.event.pull_request.body }}
      - run: echo ${{ steps.transitions.outputs.transitions }}
```
