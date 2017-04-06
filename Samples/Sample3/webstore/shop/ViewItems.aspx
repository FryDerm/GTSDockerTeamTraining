<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.ViewItems" Title="Untitled Page" Codebehind="ViewItems.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Src="../App_Controls/SalesChannelDetailControl.ascx" TagName="SalesChannelDetailControl" TagPrefix="uc1" %>
<%@ Register Src="../App_Controls/CartSmall.ascx" TagName="CartSmall" TagPrefix="uc2" %>
<%@ Register Src="../App_Controls/LoyaltyAccountControl.ascx" TagName="LoyaltyAccountControl" TagPrefix="uc3" %>
<%@ Register Src="../App_Controls/UpdateProgressControl.ascx" TagName="UpdateProgressControl" TagPrefix="uc4" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
	<div id="ViewItems" >
		<cc1:HtmlContent ID="ReviewOrderHtmlContent" Kind="ViewItems" runat="server" />
		<asp:ScriptManager ID="ScriptManager1" runat="server" />
		
		<asp:UpdatePanel ID="UpdatePanel" runat="server">
			<ContentTemplate>

                <div data-replace="ViewItemsError">
                
                    <span data-text="error">

				<asp:Label ID="ErrorMessageLabel" CssClass="message errorMessage" runat="server" Visible="false" EnableViewState="false" />

                        </span>

                </div>
                <div data-replace="LoyaltyLogin">
				    <uc3:LoyaltyAccountControl
					    ID="LoyaltyAccountControl"
					    runat="server"
					    OnLoyaltyAccountValidated="LoyaltyAccountControl_LoyaltyChanged"
					    OnLoyaltyAccountValidationFailed="LoyaltyAccountControl_LoyaltyAccountValidationFailed"
					    OnLoyaltyModeChanged="LoyaltyAccountControl_LoyaltyChanged"
					    OnLoyaltyModeFailed="LoyaltyAccountControl_LoyaltyModeFailed"
					    OnLoyaltyProgramCleared="LoyaltyAccountControl_LoyaltyChanged" />
                </div>
				<table width="100%">
					<tr>
						<td>
							<uc1:SalesChannelDetailControl
								ID="SalesChannelDetailControl"
								runat="server"
								PresenterOption="Quantity"
								OnErrorNotification="SalesChannelDetailControl_ErrorNotification"
								OnItemsAdded="SalesChannelDetailControl_ItemsAdded" />
						</td>
						<td valign="top">
							<uc2:CartSmall ID="CartSmall" runat="server" />
						</td>
					</tr>
				</table>
			</ContentTemplate>
		</asp:UpdatePanel>
		<uc4:UpdateProgressControl ID="UpdateProgressControl" runat="server" />
	</div>
	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/viewItems.html") %>
</asp:Content>