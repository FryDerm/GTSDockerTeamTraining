<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" Inherits="Gateway.WebStore.Shop.PassRenewal" Title="Untitled Page" Codebehind="PassRenewal.aspx.cs" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Reference Control="~/masterpage.master" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">

    <div id="PassRenewal" data-replace="PassRenewals">

		<cc1:HtmlContent id="HeaderHtmlContent" Kind="PassRenawal" runat="server" />

        <asp:Repeater ID="RenewalPLURepeater" runat="server" OnItemDataBound="RenewalPLURepeater_ItemDataBound">
            <HeaderTemplate>
                <table width="100%">
                <tr><td date-text="header"><asp:Literal ID="HeaderLiteral" runat="server" /></td></tr>
            </HeaderTemplate>
            <ItemTemplate>
                 <tr data-object-key="renewalItems">
                    <td data-text='renewablePLUName'><asp:Literal ID="RenewablePLUNameLiteral" runat="server" /></td>
                    <td data-text='renewablePLUPrice'><asp:Literal ID="RenewablePLUPriceLiteral" runat="server" /></td>
                    <td>
						<span data-el='add-to-cart'><asp:Button ID="RenewalSelectedButton" runat="server" OnClick="RenewalSelectedButton_Click" /></span>
                        <span data-el="PLU"><asp:HiddenField ID="PLUHiddenField" runat="Server" /></span>   
                    </td>
                  </tr>
            </ItemTemplate>
            <FooterTemplate>
                </table>
            </FooterTemplate>
        </asp:Repeater>
    </div>
      <% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/passRenewals.html") %>
    
</asp:Content>