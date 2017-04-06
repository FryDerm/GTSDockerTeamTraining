<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="SelectCustomer.aspx.cs" Inherits="Gateway.WebStore.account.SelectCustomer" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server" >
    <div data-replace="selectCustomer">
	    <asp:Literal ID="SelectCustomerInfo" runat="server" /><br /><br />
	    <span data-el="customersSelect"><asp:DropDownList ID="SelectCustomerDropDownList" runat="server" /></span><br /><br />
	    <span data-el="continue"><asp:Button ID="SelectCustomerButton" runat="server" OnClick="SelectCustomerButton_Click" /></span>
	    <asp:Button ID="CancelButton" runat="server" OnClick="CancelButton_Click" />
    </div>
    
    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/selectCustomer.html") %>

</asp:Content>