<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Checkout.BillingInfo" Title="Untitled Page" Codebehind="BillingInfo.aspx.cs" %>
<%@ Register Src="../App_Controls/CustContactsForm.ascx" TagName="CustContactsForm" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/AccountForm.ascx" TagName="AccountForm" TagPrefix="uc2" %>
<%@ Register Src="../App_Controls/PassContactSelector.ascx" TagName="PassContactSelector" TagPrefix="uc3" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <div id="PassContactSelector">
        <asp:PlaceHolder ID="PassContactSelectorPlaceHolder" runat="server" />
    </div>
	<div id="BillingInfo">
		<cc1:HtmlContent ID="ReviewOrderHtmlContent" Kind="BillingInfo" runat="server" />
		
		<!-- Copy Billing to Shipping check box -->
		<div id="SetBillingToShippingTableRow" runat="server">
			<span>
				<asp:CheckBox ID="SetBillingToShippingCheckBox" runat="server" Visible="false" />
			</span>
		</div>

		<uc1:CustContactsForm ID="CustContactsForm" runat="server" />
		<asp:PlaceHolder ID="CreateAccountPlaceHolder" runat="server">
		<br />
	    <table>
		    <tr>
			    <td>
				    <asp:CheckBox ID="CreateAccountCheckBox" runat="server" AutoPostBack="true" OnCheckedChanged="CreateAccountCheckBox_OnCheckedChanged" />
			    </td>
		    </tr>
		    <tr>
			    <td><hr size="1" noshade /></td>
		    </tr>
	    </table>

	    <uc2:AccountForm ID="AccountForm" runat="server" />
			
		</asp:PlaceHolder>
		<asp:Button ID="ContinueButton" runat="server" OnClick="ContinueButton_Click" />
		<br />
	</div>
</asp:Content>