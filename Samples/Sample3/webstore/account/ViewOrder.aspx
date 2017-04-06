<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ViewOrder.aspx.cs" MasterPageFile="~/MasterPage.master" Inherits="Gateway.WebStore.Account.ViewOrder" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>

<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">

	<script language="javascript" type="text/javascript">
	    function ShowTickets() {
	        window.open('../checkout/ViewTickets.aspx', 'ShowTickets', 'menubar=yes,scrollbars=yes,resizable=yes,width=600,height=560,top=0,left=0');
	    }
	</script>

<div id="ViewOrder" data-replace="viewOrder">

    <span data-text="no-selections-error"><asp:Literal ID="ViewOrderNoTicketsSelectedMessage" runat="server" /></span>

    <div id="ViewOrderInfo" data-text="order-info"><asp:Literal ID="ViewOrderInfoLiteral" runat="server" /></div>
    <table>
    <tr>
        <td class="ExternalIDCell">
            <span data-text="external-id-label"><asp:Literal ID="OrderConfirmationLiteral" runat="server" /></span>&nbsp;
            <span data-text="external-id"><asp:Literal ID="ExternalIDLiteral" runat="server" /></span>
        </td>
        <td class="ButtonRight" data-el="select-all-button">
            <asp:Button ID="SelectAllButton" runat="server" OnClick="SelectAllButton_OnClick" />
        </td>
        <span data-text="view-tickets-button"><asp:Literal ID="ViewTicketsButton" runat="server" /></span>
    </tr>
    
    <tr>
        <td colspan="2">
            <asp:GridView ID="TicketGridView" runat="server" 
                AutoGenerateColumns="false" OnRowDataBound="TicketGridView_RowDataBound"
                CssClass="OrderTable" >

            <AlternatingRowStyle CssClass="AltRow"  />
            <RowStyle CssClass ="Row" />

            <EmptyDataTemplate>
                <span data-text="empty-label">
                    <asp:Literal ID="EmptyViewOrderLiteral" runat="server" />
                </span>
            </EmptyDataTemplate>

                <Columns>
                    <asp:TemplateField ItemStyle-CssClass="DescriptionCell">
                        <HeaderTemplate><span data-table-shift="header" data-text="description-label"><asp:Literal ID="DescriptionHeaderLiteral" runat="server" /></span></HeaderTemplate>  
                        <ItemTemplate><span data-table-shift="tickets" data-text="description"><asp:Literal ID="DescriptionLiteral" runat="server" /></span></ItemTemplate>
                    </asp:TemplateField>  

                    <asp:TemplateField ItemStyle-CssClass="GuestNameCell">
                        <HeaderTemplate><span data-text="guest-name-label"><asp:Literal ID="GuestNameHeaderLiteral" runat="server" /></span></HeaderTemplate>
                        <ItemTemplate><span data-text="guest-name"><asp:Literal ID="GuestNameLiteral" runat="server" /></span></ItemTemplate>
                    </asp:TemplateField>

                    <asp:TemplateField ItemStyle-CssClass="PrintCell">
                        <HeaderTemplate><span data-text="print-label"><asp:Literal ID="PrintHeaderLiteral" runat="server" /></span></HeaderTemplate>
                        <ItemTemplate><span data-el="print-checkbox"><asp:CheckBox ID="PrintCheckBox" runat="server" /></span>					
                        <span data-el="visual-id-hidden"><asp:HiddenField ID="VisualIDHiddenField" runat="server" /></span></ItemTemplate>
                    </asp:TemplateField>

                </Columns>
            </asp:GridView>
        </td>
    </tr>

    <tr>
        <td data-el="back-button"><asp:Button ID="BackButton" runat="server" OnClick="BackButton_OnClick" /></td>
        <td class="ButtonRight" data-el="print-button"><asp:Button ID="PrintButton" runat="server" OnClick="PrintButton_OnClick" Enabled="false" /></td>
    </tr>

    </table>
</div>

	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/viewOrder.html") %>

</asp:Content>