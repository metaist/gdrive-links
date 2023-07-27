/** Google Workspace Add-on to Copy Google Drive Links
 * @author Metaist LLC <metaist@metaist.com>
 * @license MIT
 */

/** Information about a [user's Google Drive and its contents](https://developers.google.com/apps-script/add-ons/concepts/event-objects#drive-event-object).
 * @typedef {Object} DriveEvent
 * @property {DriveItem} activeCursorItem The Drive item currently active.
 * @property {DriveItem[]} selectedItems A list of items (files or folders) selected in Drive.
 */

/** Information about a [specific Drive item](https://developers.google.com/apps-script/add-ons/concepts/event-objects#drive-item).
 * @typedef {Object} DriveItem
 * @property {boolean} addonHasFileScopePermission If `true`, the add-on has
 * requested and received https://www.googleapis.com/auth/drive.file scope
 * authorization for this item; otherwise this field is `false`.
 * @property {string} id The ID of the selected item.
 * @property {string} iconUrl The URL of the icon that represents the selected item.
 * @property {string} mimeType The MIME type of the selected item.
 * @property {string} title The title of the selected item.
 */

/** Convert a a selected Google Drive item to a link.
 * @param {DriveItem} item  Selected Google Drive item.
 * @returns {string} HTML link to the item.
 */
const getLink = (item) => `<a href="${DriveApp.getFileById(item.id).getUrl()}">${item.title}</a>`;

/** UI for home screen.
 * @returns {CardService.ActionResponse} UI for home screen.
 */
const onHomepage = () => {
  const card = CardService.newCardBuilder();
  const section = CardService.newCardSection();
  const text = CardService.newTextParagraph().setText("Select some files to view links.");

  section.addWidget(text);
  card.addSection(section);
  return card.build();
};

/** UI for selected items.
 * @param {DriveEvent} e  [Drive event object](https://developers.google.com/apps-script/add-ons/concepts/event-objects#drive_event_object).
 * @returns {CardService.ActionResponse} UI for selected items.
 */
const onDriveItemsSelected = (e) => {
  const card = CardService.newCardBuilder();
  const section = CardService.newCardSection();

  const links = e.drive.selectedItems.map(getLink);
  section.addWidget(CardService.newTextParagraph().setText(links.join("<br>")));

  card.addSection(section);
  return card.build();
};
