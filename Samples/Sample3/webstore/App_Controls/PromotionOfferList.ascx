<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.Web.UI.Controls.PromotionOfferList" Codebehind="PromotionOfferList.ascx.cs" %>
<div id="PromotionOfferList" data-object-key="promo-list">
	<asp:DataList ID="PromotionOffersDataList" runat="server" OnItemDataBound="PromotionOffersDataList_ItemDataBound">
		<ItemTemplate>
			<table id="PromotionOfferTable" runat="server" data-table-shift="promotion-offer">
				<tr>
					<td rowspan="4" id="ImageCell" runat="server"><span data-el="PromotionOfferImage"><asp:Image ID="PromotionOfferImage" runat="server" /></span></td>
				</tr> 
				<tr><td><span data-text="promotionTitle"><asp:Literal ID="PromotionTitleLiteral" runat="server" /></span></td></tr>
				<tr><td><span data-text="promotionDescription"><asp:Literal ID="PromotionTextLiteral" runat="server" /></span></td></tr>
				<tr><td><span data-el="promotionHyperlink"><asp:HyperLink ID="PromotionHyperLink" runat="server" /></span></td></tr>  
				<tr><td><span data-el="parentSalesChannelDetailId"><asp:HiddenField ID="ParentSalesChannelDetailId" runat="server" /></span></td></tr>  
			</table>
		</ItemTemplate>
	</asp:DataList>
</div>