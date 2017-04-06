<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="EventsDateTimeSelectorModal.ascx.cs" Inherits="Gateway.Web.UI.Controls.EventsDateTimeSelectorModal" %>
<%@ Register Src="../App_Controls/EventsDateTimeSelector.ascx" TagName="EventsDateTimeSelector" TagPrefix="uc1" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>
<asp:Button ID="ModalPopupExtenderDummyButton" runat="server" style="display:none;" />
<asp:Panel ID="EventsDateTimeSelectorPanel" CssClass="modalPopup" runat="server" style="display:none;">
    <div class="calendar-modal-header">
        <asp:Literal ID="CalendarModalHeaderLiteral" runat="server"></asp:Literal>
    </div>
	<uc1:EventsDateTimeSelector
		ID="EventsDateTimeSelector"
		runat="server"
		OnCalendarChanged="EventsDateTimeSelector_CalendarChanged"
		OnSelectionChanged="EventsDateTimeSelector_SelectionChanged" />
	<asp:Button ID="ModalPopupCancelButton" runat="server" OnClick="ModalPopupCancelButton_Click" />
</asp:Panel>
<cc1:ModalPopupExtender
	ID="EventsDateTimeSelectorPanel_ModalPopupExtender"
	runat="server" 
	Enabled="True"
	TargetControlID="ModalPopupExtenderDummyButton"
	PopupControlID="EventsDateTimeSelectorPanel"
	BackgroundCssClass="modalBackground"
	DropShadow="true"
	CancelControlID="ModalPopupExtenderDummyButton">
</cc1:ModalPopupExtender>