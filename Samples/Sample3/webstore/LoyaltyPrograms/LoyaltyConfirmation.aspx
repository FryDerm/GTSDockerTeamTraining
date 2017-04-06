<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="LoyaltyConfirmation.aspx.cs" Inherits="Gateway.WebStore.LoyaltyPrograms.LoyaltyConfirmation" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/LoyaltyAccountControl.ascx" TagName="LoyaltyAccountControl" TagPrefix="uc1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    
<div id="LoyaltyConfirmation" data-replace="LoyaltyConfirmation">
	<p><asp:Literal ID="LoyaltyConfirmationLiteral" runat="server" /></p>
	<uc1:LoyaltyAccountControl ID="LoyaltyAccountControl" runat="server" DisplayOnly="true" />
</div>
    
 <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/loyaltyConfirmation.html") %>

</asp:Content>