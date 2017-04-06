<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="LoyaltyView.aspx.cs" Inherits="Gateway.WebStore.Account.LoyaltyView" %>
<%@ Register Src="../App_Controls/LoyaltyAccountControl.ascx" TagName="LoyaltyAccountControl" TagPrefix="uc1" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
<div id="LoyaltyView">
	<p><asp:Literal ID="LoyaltyEnrollmentLiteral" runat="server" /></p>
	<uc1:LoyaltyAccountControl ID="LoyaltyAccountControl" runat="server" DisplayOnly="true" />
</div>
</asp:Content>