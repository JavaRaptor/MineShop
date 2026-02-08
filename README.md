# Minecraft Shop Editor (HTML → YAML)

This tool is a visual Minecraft shop editor that generates a YAML configuration file for a GUI plugin.

It allows you to choose the GUI size (in slots), edit each slot easily, generate a clean and readable YAML file, and let the plugin automatically fill empty slots with a default item.

The GUI size must be a multiple of 9. Allowed values are from 9 to 54. If an invalid number is entered, it is automatically rounded to the nearest multiple of 9. Valid sizes are 9, 18, 27, 36, 45 and 54.

To use the editor, enter the number of slots and click "Create grid". A grid with 9 columns is generated. Each cell represents a Minecraft slot starting from index 0. Clicking on a slot opens the editor panel.

Each slot can contain the following optional fields:
- Item: Minecraft material (example: GOLD_INGOT)
- Name: Display name
- Name color: Minecraft color
- Lore: Description text
- Lore color: Lore color
- Price: Numeric value
- Command: Command executed on click

Click "Save" to store the slot data. Data is stored locally using JavaScript.

Click "Export YAML" to generate the configuration file.

Export rules:
- Only configured slots are written in the YAML
- All fields are generated, even if empty
- Slots not present in content are automatically filled by the plugin using the default item

Example generated YAML:

    GUI:
      Shop:
        size: 14
        content:
          1:
            item: GOLD_INGOT
            name: "Gode"
            colorname: GOLD
            lore:
            colorlore:
            price:
            command:
        default: LIGHT_GRAY_STAINED_GLASS_PANE

In this example, only slot 1 is configured. Slots 0 and 2 to 13 will use the default item. Empty fields are kept for readability.

Available colors:
BLACK, DARK_BLUE, BLUE, DARK_GREEN, GREEN, DARK_RED, RED, GOLD, YELLOW, WHITE, AQUA, DARK_AQUA, LIGHT_PURPLE, DARK_PURPLE, GRAY, DARK_GRAY.
RESET means no color.

Plugin behavior:
If a slot is not defined in content, the plugin automatically applies the default item defined by:
default: LIGHT_GRAY_STAINED_GLASS_PANE
Empty fields are safely ignored by the plugin.

Best practices:
Use valid Minecraft materials, always use GUI sizes that are multiples of 9, leave unused slots empty for clarity, and test the YAML before using it in production.

Possible improvements include visual highlighting for configured slots, importing an existing YAML file, supporting multiple lore lines, and adding a Minecraft-style GUI preview.
