<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ETicketsDetail.ascx.cs"
	Inherits="Gateway.WebStore.Transportation.ETicketsDetail" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="cc1" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register Src="SchedulesDisplay.ascx" TagName="SchedulesDisplay" TagPrefix="uc1" %>
<%@ Register Src="ItineraryDisplay.ascx" TagName="ItineraryDisplay" TagPrefix="uc2" %>
<%@ Register Src="ScheduleDetail.ascx" TagName="ScheduleDetail" TagPrefix="uc2" %>
<%@ Register Src="ETicketWebFares.ascx" TagName="ETicketWebFares" TagPrefix="uc3" %>
<%@ Register Src="MultiRideFares.ascx" TagName="MultiRideFares" TagPrefix="uc3" %>
<cc1:TabContainer ID="ETicketDetailTabContainer" runat="server" CssClass="TabContainer">

	<%-- Departing Tab Panel --%>
	<cc1:TabPanel ID="DepartingTabPanel" runat="server" CssClass="Tab">
		<HeaderTemplate>
			<asp:Label ID="DepartingHeaderLabel" runat="server" />
		</HeaderTemplate>
		<ContentTemplate>
			<div class="TripDescription">
				<asp:Label ID="DepartingScheduleDescriptionLabel" runat="server" />
			</div>
			<div class="scheduleMessage">
				<asp:Literal ID="SelectDepartingScheduleLiteral" runat="server" />
			</div>
			<uc1:SchedulesDisplay ID="DepartingSchedulesDisplay" runat="server" DisplayMode="Normal"
				TripMode="Departing" OnWebSchedSelected="DepartingSchedulesDisplay_WebSchedSelected"
				OnWebSchedClicked="SchedulesDisplay_WebSchedClicked"
				OnWebThirdPartyRedirect="ThirdParty_WebThirdPartyRedirect" />
		</ContentTemplate>
	</cc1:TabPanel>

	<%-- Returning Tab Panel --%>
	<cc1:TabPanel ID="ReturningTabPanel" runat="server" CssClass="Tab">
		<HeaderTemplate>
			<asp:Label ID="ReturningHeaderLabel" runat="server" />
		</HeaderTemplate>
		<ContentTemplate>
			<div class="TripDescription">
				<asp:Label ID="ReturningScheduleDescriptionLabel" runat="server" />
			</div>
			<div class="scheduleMessage">
				<asp:Literal ID="SelectReturningScheduleLiteral" runat="server" />
			</div>
			<uc1:SchedulesDisplay ID="ReturningSchedulesDisplay" runat="server" DisplayMode="Normal"
				TripMode="Returning" OnWebSchedSelected="ReturningSchedulesDisplay_WebSchedSelected"
				OnWebSchedClicked="SchedulesDisplay_WebSchedClicked"
				OnWebThirdPartyRedirect="ThirdParty_WebThirdPartyRedirect" />
		</ContentTemplate>
	</cc1:TabPanel>

	<%-- Fare Options Tab Panel --%>
	<cc1:TabPanel ID="FareOptionsTabPanel" runat="server" CssClass="Tab">
		<HeaderTemplate>
			<asp:Label ID="FareOptionsHeaderLabel" runat="server" />
		</HeaderTemplate>
		<ContentTemplate>

			<%-- Description Label --%>
			<div class="TripDescription">
				<asp:Label ID="FareOptionsDescriptionLabel" runat="server" />
			</div>

			<%-- No Schedule Selected Message Panel --%>
			<asp:Panel ID="FareOptionsMessagePanel" runat="server" CssClass="FareOptionsMessage">
				<asp:Label ID="FareOptionsMessageLabel" runat="server" />
			</asp:Panel>

			<%-- FaresTable Panel --%>
			<asp:Panel ID="FaresTablePanel" runat="server">
				<uc3:ETicketWebFares ID="ETicketWebFaresControl" runat="server" OnAddToCartButtonClick="AddToCartButtonClick"
					OnTransportationTicketsDataBound="TransportationTicketsDataBound" />
				<uc2:ItineraryDisplay ID="FareOptionsItineraryDisplay" runat="server" DisplayMode="Detail" />
			</asp:Panel>

			<%-- MultiRide Fares Panel --%>
			<asp:Panel ID="MultiRideFaresPanel" runat="server">
				<uc3:MultiRideFares ID="MultiRideFaresControl" runat="server" OnAddToCartButtonClick="AddToCartButtonClick"
					OnTransportationTicketsDataBound="TransportationTicketsDataBound" />
			</asp:Panel>
		</ContentTemplate>
	</cc1:TabPanel>
</cc1:TabContainer>

<asp:Panel ID="ScheduleDetailPanel" runat="server" Style="display: none;" CssClass="modalPopup">
	<div id="BackToTrip">
		<asp:Button ID="ModalCloseButton" CssClass="ModalCloseButton" runat="server" OnClick="BackToTripButton_Click" />
	</div>
	<uc2:ScheduleDetail ID="ScheduleDetailControl" runat="server" />
	<div class="BackToTrip">
		<asp:Button ID="BackToTripButton" runat="server" OnClick="BackToTripButton_Click" />
	</div>
</asp:Panel>
<asp:Button ID="HiddenButton" runat="server" Style="display: none;" />
<cc1:ModalPopupExtender ID="ScheduleDetailPanel_ModalPopupExtender" runat="server"
	TargetControlID="HiddenButton" PopupControlID="ScheduleDetailPanel" OkControlID="BackToTripButton"
	BackgroundCssClass="modalBackground" />

<!-- Third Party Modal Agreement -->
<asp:Panel ID="ThirdPartyAgreementPanel" runat="server" Style="display: none;" CssClass="ThirdPartyModalPopup">
	<div id="ThirdPartyImageContainer">
		<asp:ImageMap runat="server" ID="ThirdPartyImageMap" ImageUrl="~/images/GTS/third_party_popup.png"
			HotSpotMode="PostBack" OnClick="ThirdPartyButton_Click">
			<asp:RectangleHotSpot Top="18" Left="18" Bottom="35" Right="72" HotSpotMode="PostBack" PostBackValue="Close" />
			<asp:RectangleHotSpot Top="350" Left="128" Bottom="385" Right="345" HotSpotMode="PostBack" PostBackValue="MoveOn" />
		</asp:ImageMap>
	</div>
	<div id="ThirdPartyMessage">
		<asp:Label ID="ThirdPartyMessageLabel" runat="server" Text="You are about to leave the site." Visible="false" />
	</div>
</asp:Panel>
<asp:Button ID="ThirdPartyHiddenButton" runat="server" Style="display: none;" />
<cc1:ModalPopupExtender ID="ThirdPartyAgreementPanel_ModalPopupExtender" runat="server"
	TargetControlID="ThirdPartyHiddenButton" PopupControlID="ThirdPartyAgreementPanel" BackgroundCssClass="modalBackground" />
