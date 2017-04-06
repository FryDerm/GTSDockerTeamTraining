<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ETicketWebFares.ascx.cs" Inherits="Gateway.WebStore.Transportation.ETicketWebFares" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>

<table class="FaresTable" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2">
            <div id="TemplateDetailsHeader">
                <asp:Label ID="TemplateDetailsLabel" runat="server" />        
            </div>
        </td>
    </tr>
    <tr>
        <td class="FaresTableLeftColumn">        
            <asp:Repeater ID="TemplateDetailsRepeater" runat="server" OnItemDataBound="TemplateDetailsRepeater_ItemDataBound">
                <HeaderTemplate>
                    <table class="TemplateDetailsTable" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="ItemNameHeaderCell"><asp:Label ID="ItemNameHeaderLabel" runat="server" /></td>
                        <td class="ItemPriceHeaderCell"><asp:Label ID="ItemPriceHeaderLabel" runat="server" /></td>
                        <td class="ItemQuantityHeaderCell"><asp:Label ID="ItemQuantityHeaderLabel" runat="server" /></td>
                    </tr>
                </HeaderTemplate>
                <ItemTemplate>
                        <tr>
                            <td class="ItemNameCell">
                                <asp:Label ID="ItemNameLabel" runat="server" />&nbsp;
                            </td>
                            <td class="ItemPriceCell">
                                <asp:Label ID="ItemPriceLabel" runat="server" />
                            </td>
                            <td class="ItemQuantityCell">
                                <cc1:NumericTextBox ID="ItemQuantityTextBox" runat="server" AllowDecimal="false" AllowNegative="false" />
								<asp:HiddenField ID="WebFareID" runat="server" />
                            </td>
                        </tr>
                </ItemTemplate>               
                <FooterTemplate>
                        <tr>
                            <td colspan="3">
                                <asp:Button ID="AddToCartButton" runat="server" OnClick="AddToCartButton_Click" />    
                            </td>
                        </tr>
                    </table>
                </FooterTemplate>
            </asp:Repeater>
        </td>
        <td class="FaresTableRightColumn">
            <asp:GridView ID="WebFaresGridView" GridLines="None" ShowHeader="false" runat="server" AutoGenerateColumns="false" CssClass="WebFaresSelection"
                OnRowDataBound="WebFaresGridView_RowDataBound"
                OnRowCommand="WebFaresGridView_RowCommand">
                <Columns>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:LinkButton ID="SelectWebFareLinkButton" CommandName="SelectWebFare" runat="server" />
                        </ItemTemplate>
                        <ItemStyle CssClass="WebFareLinkColumn" />
                    </asp:TemplateField>
                    <%-- FareAmount --%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:Label ID="WebFareFareAmountLabel" runat="server" />
                        </ItemTemplate>
                        <ItemStyle CssClass="WebFareAmountColumn" />
                    </asp:TemplateField>
                    <%-- RestrictionText --%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:Label ID="WebFareRestrictionTextLabel" runat="server" />
                        </ItemTemplate>
                        <ItemStyle CssClass="WebFareRestrictionColumn" />
                    </asp:TemplateField>
                    <%-- Type --%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:Label ID="WebFareTypeLabel" runat="server" />
                        </ItemTemplate>
                        <ItemStyle CssClass="WebFareTypeColumn" />
                    </asp:TemplateField>
                    <%-- Days --%>
                    <asp:TemplateField>
                        <ItemTemplate>
                            <asp:Label ID="WebFareDaysLabel" runat="server" />
                        </ItemTemplate>
                        <ItemStyle CssClass="WebFareDaysColumn" />
                    </asp:TemplateField>
                </Columns>
                <SelectedRowStyle CssClass="SelectedRow" />
                <RowStyle CssClass="Row" />                
            </asp:GridView>
        </td>
    </tr>
</table>
