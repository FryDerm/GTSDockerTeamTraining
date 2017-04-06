<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="OrderError.aspx.cs" Inherits="Gateway.WebStore.shop.OrderError" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <div id="OrderError">
        <p><asp:Literal ID="OrderErrorLiteral" runat="server" /></p>
    </div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/orderError.html") %>
</asp:Content>