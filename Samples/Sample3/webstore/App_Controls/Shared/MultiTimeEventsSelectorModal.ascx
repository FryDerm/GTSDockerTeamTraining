<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MultiTimeEventsSelectorModal.ascx.cs" Inherits="Gateway.Web.UI.Controls.MultiTimeEventsSelectorModal" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<%@ Register src="MultiTimeEventsSelector.ascx" tagname="MultiTimeEventsSelector" tagprefix="uc1" %>

<asp:Button ID="ModalPopupExtenderDummyButton" runat="server" style="display:none;" />
<asp:Panel ID="MultiTimeEventsSelectorPanel" CssClass="MultiTimeModalPopup" runat="server" style="display:none;">
	<uc1:MultiTimeEventsSelector ID="MultiTimeEventsSelector"  
									runat="server"
									OnCalendarChanged="MultiTimeEventsSelector_CalendarChanged"
									OnSelectionChanged="MultiTimeEventsSelector_SelectionChanged" />

<asp:Button ID="ModalPopupCancelButton" CssClass="ModalPopUpCancel" runat="server" OnClick="ModalPopupCancelButton_Click" />
</asp:Panel>

<cc1:ModalPopupExtender
	ID="MultiTimeEventsSelectorPanel_ModalPopupExtender"
	runat="server" 
	Enabled="True"
	TargetControlID="ModalPopupExtenderDummyButton"
	PopupControlID="MultiTimeEventsSelectorPanel"
	BackgroundCssClass="modalBackground"
	DropShadow="true"
	CancelControlID="ModalPopupExtenderDummyButton">
</cc1:ModalPopupExtender>
