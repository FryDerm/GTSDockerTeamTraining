<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/MasterPage.master"  CodeBehind="OrderHistory.aspx.cs" Inherits="Gateway.WebStore.Account.OrderHistory" %>
<%@ Import Namespace="Gateway.Business.Helpers" %>
<%@ Import Namespace="Gateway.Web" %>
<%@ MasterType virtualpath="~/MasterPage.master" %>
<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">

<div id="OrderHistory" data-replace="orderHistory">
    <div class="OrderHistoryTitle" data-text="title"><asp:Literal ID="OrderHistoryTitleLiteral" runat="server" /></div>
    <div id="OrderHistoryInfo" data-text="historyInfo"><asp:Literal ID="OrderHistoryInfoLiteral" runat="server" /></div>
    <asp:GridView ID="OrdersGridView" runat="server" 
        AutoGenerateColumns="false" OnRowDataBound="OrdersGridView_RowDataBound"
        OnPageIndexChanging="OrdersGridView_OnPageIndexChanging"
         GridLines="None" CssClass="OrdersTable"
        AllowPaging="true" PageSize="15">
        <AlternatingRowStyle CssClass="AltRow" />
        <RowStyle CssClass ="Row" />
        <PagerSettings Mode="NumericFirstLast" Position="Bottom" />
        <PagerStyle CssClass="OrderHistoryTablePager" />

        <Columns>
            <asp:TemplateField ItemStyle-CssClass="OpenDateCell">
                <HeaderTemplate><span data-table-shift="header" data-text="open-date-header"><asp:Literal ID="OpenDateHeaderLiteral" runat="server" /></span></HeaderTemplate>  
                <ItemTemplate><span data-table-shift="orders" data-text="open-date"><asp:Literal ID="OpenDateLiteral" runat="server" /></span></ItemTemplate>
            </asp:TemplateField>  

            <asp:TemplateField ItemStyle-CssClass="ExtIDCell">
                <HeaderTemplate><span data-text="external-id-header"><asp:Literal ID="ExternalIDHeaderLiteral" runat="server" /></span></HeaderTemplate>  
                <ItemTemplate><span data-text="external-id"><asp:Literal ID="ExternalIDLiteral" runat="server" /></span></ItemTemplate>
            </asp:TemplateField>  

            <asp:TemplateField ItemStyle-CssClass="OrderAmountCell">
                <HeaderTemplate><span data-text="order-amount-header"><asp:Literal ID="OrderAmountHeaderLiteral" runat="server" /></span></HeaderTemplate>  
                <ItemTemplate><span data-text="order-amount-header"><asp:Literal ID="OrderAmountLiteral" runat="server" /></span></ItemTemplate>
            </asp:TemplateField>  

            <asp:TemplateField ItemStyle-CssClass="ViewOrderCell">
                <HeaderTemplate></HeaderTemplate>
                <ItemTemplate><span data-el="view-order-link"><asp:HyperLink ID="ViewOrderHyperLink" runat="server" /></span></ItemTemplate>
            </asp:TemplateField>            
        </Columns>
        <EmptyDataTemplate>
            <span data-text="no-orders-message"><asp:Literal ID="EmptyOrderHistoryLiteral" runat="server" /></span>
        </EmptyDataTemplate>
    </asp:GridView>
</div>

	<% =FrontEndFileHelper.ReadFrontEndFileContent("~/FrontEnd/" + StateManager.SalesChannel.Merchant.WebTheme + "/orderHistory.html") %>

</asp:Content>