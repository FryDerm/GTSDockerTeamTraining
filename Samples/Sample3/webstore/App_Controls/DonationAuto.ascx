<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="DonationAuto.ascx.cs" Inherits="Gateway.Web.UI.Controls.DonationAuto" %>
<asp:Panel ID="DonationAutoPlaceHolder" DefaultButton="DonationAutoRemoveButton" CssClass="donationAutoBlock" runat="server">
	<asp:Label ID="DonationAutoDescriptionLabel" CssClass="donationDescription" runat="server" Text="Your donation helps fund our oranization by helping fee the zebras a special diet. Won't you give now? Your order will be rounded up to the nearest dollar amount." />
	<asp:Label ID="DonationAutoInfoLabel" CssClass="donationInfo" runat="server" Text="A donation of {0} was automatically added to your order. Click on 'Remove Donation' to remove this from your order." />
	<asp:Button ID="DonationAutoRemoveButton" CssClass="donationButton" runat="server" Text="Remove Donation" OnClick="DonationAutoRemoveButton_Click" />
</asp:Panel>