<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DonationOptOut.ascx.cs" Inherits="Gateway.Web.UI.Controls.DonationOptOut" %>
<asp:Panel ID="DonationOptOutPlaceHolder" DefaultButton="DonationOptOutRemoveButton" CssClass="donationOptOutBlock blockDisplay" runat="server">
	<asp:Label ID="DonationOptOutDescriptionLabel" CssClass="donationDescription" runat="server" />
	<asp:Label ID="DonationOptOutInfoLabel" CssClass="donationInfo" runat="server" />
	<asp:Button ID="DonationOptOutRemoveButton" CssClass="donationButton" runat="server" OnClick="DonationOptOutRemoveButton_Click" />
</asp:Panel>