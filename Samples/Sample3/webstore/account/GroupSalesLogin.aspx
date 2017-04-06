<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Account.GroupSalesLogin" Title="Untitled Page" Codebehind="GroupSalesLogin.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<%@ Register src="../App_Controls/Login.ascx" tagname="Login" tagprefix="uc1" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">

    <div data-replace="groupSalesLogin" data-parser="wshtml">
		    <cc1:HtmlContent id="HeaderHtmlContent" Kind="GroupSalesLogin" runat="server" />
        </div>

    <div data-replace="groupSalesLogin">

	<div id="GroupsSalesLogin">

		<uc1:Login ID="LoginControl"
		        runat="server"
				AuthenticateType="eGalaxy"
				ForgotPasswordNavigateUrl="~/account/PasswordRequest.aspx"
	 			OnAuthenticated="LoginControl_Authenticated"
				OnAuthenticationFailed="LoginControl_AuthenticationFailed"
				OnInvalidGroupSalesCode="LoginControl_InvalidGroupSalesCode"
				OnPendingGroupSalesCode="LoginControl_PendingGroupSalesCode" />
	</div>
	<div id="GroupSalesCreateAccount">
		<asp:HyperLink ID="GroupSalesCreateAccountHyperLink" runat="server" NavigateUrl="~/account/CreateAccount.aspx?returnUrl=~/Shop/GroupSalesVerifyLimits.aspx" />
	</div>
	<div id="GroupSalesCreateCorporateAccount">
		<asp:HyperLink ID="GroupSalesCreateCorporateAccountHyperLink" runat="server" NavigateUrl="~/account/RequestCorporateAccount.aspx" />
	</div>

    </div>

    <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/groupSalesLogin.html") %>

</asp:Content>