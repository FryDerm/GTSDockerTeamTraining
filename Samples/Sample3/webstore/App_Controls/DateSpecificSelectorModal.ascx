<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DateSpecificSelectorModal.ascx.cs" Inherits="Gateway.Web.UI.Controls.DateSpecificSelectorModal" %>
<%@ Register Src="../App_Controls/DateSpecificSelector.ascx" TagName="DateSpecificSelector" TagPrefix="uc1" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<asp:Button ID="ModalPopupExtenderDummyButton" runat="server" style="display:none;" />
<asp:Panel ID="DateSpecificSelectorPanel" CssClass="modalPopup" runat="server" style="display:none;">
	<uc1:DateSpecificSelector
		ID="DateSpecificSelector"
		runat="server"
		OnCalendarChanged="DateSpecificSelector_CalendarChanged"
		OnSelectionChanged="DateSpecificSelector_SelectionChanged" />
	<asp:Button ID="ModalPopupCancelButton" runat="server" OnClick="ModalPopupCancelButton_Click" />
</asp:Panel>
<cc1:ModalPopupExtender
	ID="DateSpecificSelectorPanel_ModalPopupExtender"
	runat="server" 
	Enabled="True"
	TargetControlID="ModalPopupExtenderDummyButton"
	PopupControlID="DateSpecificSelectorPanel"
	BackgroundCssClass="modalBackground"
	DropShadow="true"
	CancelControlID="ModalPopupExtenderDummyButton">
</cc1:ModalPopupExtender>