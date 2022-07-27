#  Using bot

## Application commands

To use bot commands, type `[/]` and select a command from the list

## Customization system

In the documentation you will find examples of customization for each of the functions described, but most are based on this formula:

### With embeds

```json
  {
  "command": "Example command name",
  "messageType": "Example command message type",
  "messageComponent": "Button/Select Menu",
  "message": "Example message", 
  "embed": {
    "title": "Embed title",
    "description": "Embed description",
    ... more
  }
}
```
