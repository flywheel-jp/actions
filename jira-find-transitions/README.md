# Jira Find Transitions

> Extract transition declarations from string.

## Usage

```yaml
- uses: flywheel-jp/actions/jira-find-transitions@main
  id: transitions
  with:
    jira_base_url: ${{ secrets.JIRA_BASE_URL }}
    jira_user_email: ${{ secrets.JIRA_USER_EMAIL }}
    jira_api_token: ${{ secrets.JIRA_API_TOKEN }}
    string: |
      Move JIRA-1 to Done
      Move ABC-123 to ToDo
      Move UNKNOWN-4 to Done
      Move JIRA-12 to not exist
# Becomes: 'echo {"JIRA-1": "Done","ABC-123":"ToDo"}'
- run: echo ${{ steps.transitions.outputs.transitions }}
```
