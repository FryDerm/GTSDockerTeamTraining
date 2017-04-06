<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.OrderInfo" Codebehind="OrderInfo.ascx.cs" %>
<%@ Register Assembly="Gateway" Namespace="Gateway.Web.UI.Controls" TagPrefix="cc1" %>
<%@ Register Src="Cart.ascx" TagName="Cart" TagPrefix="uc1" %>
<div id="OrderInfo">
    <table width="100%">
        <tr>
            <td>
                <div id="BillingInformation" data-html="BillingInfo">
                    <asp:Label ID="BillingInformationLabel" runat="server" CssClass="OrderInfoHeading" />&nbsp;
                    <asp:HyperLink ID="BillingEditHyperLink" runat="server" NavigateUrl="~/checkout/BillingInfo.aspx" CssClass="OrderInfoEditHyperLink" /><br />
                    <asp:Literal ID="CustomerNameLiteral" runat="server" visible="false" />
                    <cc1:ContactLabel ID="BillingContactLabel" ContactType="BillTo" runat="server" />
                </div>
                
                <div id="ShippingInformation"data-html="ShippingInfo">
                    <asp:Label ID="ShippingInformationLabel" CssClass="OrderInfoHeading" runat="server" />&nbsp;
                    <asp:HyperLink ID="ShippingEditHyperLink" runat="server" NavigateUrl="~/checkout/ShippingInfo.aspx" CssClass="OrderInfoEditHyperLink" /><br />
                    <cc1:ContactLabel ID="ShippingContactLabel" ContactType="ShipTo" runat="server" />
                    <asp:Label ID="ShippingEmailLabel" runat="server" Visible="false" />
                </div>
                
                <div id="DeliveryInformation" data-html="DeliveryInfo">
                    <asp:Label ID="DeliveryInformationLabel" CssClass="OrderInfoHeading" runat="server" />&nbsp;
                    <asp:HyperLink ID="DeliveryEditHyperLink" runat="server" NavigateUrl="~/checkout/DeliveryInfo.aspx" CssClass="OrderInfoEditHyperLink" /><br />
                    <div data-text="DeliveryMethod" id="DeliveryMethodName"><asp:Literal ID="DeliveryMethodNameLiteral" runat="server" /></div>
                    <div id="DeliveryMethodDescription"><asp:Literal ID="DeliveryMethodDescriptionLiteral" runat="server" /></div>
                    <div id="DeliveryMethodEstimatedShipDate">
                        <asp:Label id="ShipDateLiteral" runat="server" />: <asp:Literal ID="DeliveryMethodEstimatedShipDateLiteral" runat="server" />
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="OrderInformation">
                    <asp:Label ID="OrderInformationLabel" CssClass="OrderInfoHeading" runat="server" />&nbsp;
                    <asp:HyperLink ID="OrderEditHyperLink" runat="server" NavigateUrl="~/shop/ViewCart.aspx" CssClass="OrderInfoEditHyperLink" /><br />
                    <uc1:Cart ID="CartControl" ReadOnly="true" AlwaysDisplayCart="true" runat="server" />
                </div>
            </td>
        </tr>
    </table>
</div>