# Jira Perform Transitions

> Perform transitions.

## Usage

```yaml
- uses: flywheel-jp/actions/jira-find-transitions@main
  id: find
  with:
    jira_base_url: ${{ secrets.JIRA_BASE_URL }}
    jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
    jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
    string: |
      Move JIRA-1 to Done
      Move ABC-123 to ToDo
      Move UNKNOWN-4 to Done
      Move JIRA-12 to not exist
- uses: flywheel-jp/actions/jira-perform-transitions@main
  with:
    jira_base_url: ${{ secrets.JIRA_BASE_URL }}
    jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
    jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
    transitions: ${{ steps.find.outputs.transitions }}
```
