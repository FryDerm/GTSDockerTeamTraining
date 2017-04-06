<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeBehind="PassConfirmation.aspx.cs" Inherits="Gateway.WebStore.shop.PassConfirmation" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Register Src="../App_Controls/CartSmall.ascx" TagName="CartSmall" TagPrefix="uc2" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">

    <uc2:CartSmall ID="CartSmall" runat="server" />

    <div data-replace="PassConfirmation">
	    <span data-text="header"><asp:Label ID="HeaderLabel" runat="server" /></span>
	    <hr />
	    <span data-text="description"><asp:Label ID="DescriptionLabel" runat="server" /></span>
	    <table class="PassInformationTable">
		    <tr>
			    <td>
				    <span data-text="nameLabel"><asp:Label ID="PassHolderNameLabel" runat="server" CssClass="FieldLabel" /></span>
			    </td>
			    <td>
				    <span data-text="nameValue"> <asp:Label ID="PassHolderNameValueLabel" runat="server" /></span>
			    </td>
		    </tr>
		    <tr id="PassKindRow" runat="server">
			    <td>
				    <span data-text="passKindLabel"><asp:Label ID="PassKindLabel" runat="server" CssClass="FieldLabel" /></span>
			    </td>
			    <td>
				     <span data-text="passKindValue"><asp:Label ID="PassKindValueLabel" runat="server" /></span>
			    </td>
		    </tr>
		    <tr>
			    <td>
				    <span data-text="expDateLabel"><asp:Label ID="PassExpirationDateLabel" runat="server" CssClass="FieldLabel" /></span>
			    </td>
			    <td>
				    <span data-text="expDateValue"><asp:Label ID="PassExpirationDateValueLabel" runat="server" /></span>
			    </td>
		    </tr>
		    <tr>
			    <td colspan="2" class="Buttons">
				    <span data-el="cancelButton"><asp:Button ID="CancelButton" OnClick="CancelButton_OnClick" runat="server" /></span>
				    <span data-el="continueButton"><asp:Button ID="ContinueButton" OnClick="ContinueButton_OnClick" runat="server" /></span>
			    </td>
		    </tr>
	    </table>
    </div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/passConfirmation.html") %>
</asp:Content>
