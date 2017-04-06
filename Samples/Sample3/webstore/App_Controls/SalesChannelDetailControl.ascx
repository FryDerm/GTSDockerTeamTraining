<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SalesChannelDetailControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.SalesChannelDetailControl" %>
<%@ Register Src="SalesChannelDetailPLUControl.ascx" TagName="SalesChannelDetailPLUControl" TagPrefix="uc1" %>
<%@ Register Src="PaymentPlanSelector.ascx" TagName="PaymentPlanSelector" TagPrefix="uc2" %>
<%@ Register Src="UpsellOptions.ascx" TagName="UpsellOptions" TagPrefix="uc3" %>
<%@ Register Src="ItemVariations.ascx" TagName="ItemVariations" TagPrefix="uc3" %>
<%@ Register Src="EventsDateTimeSelectorModal.ascx" TagName="EventsDateTimeSelectorModal" TagPrefix="uc4" %>
<%@ Register Src="DateSpecificSelectorModal.ascx" TagName="DateSpecificSelectorModal" TagPrefix="uc5" %>
<%@ Register src="MultiTimeEventsSelectorModal.ascx" tagname="MultiTimeEventsSelectorModal" tagprefix="uc6" %>
<%@ Register assembly="AjaxControlToolkit" namespace="AjaxControlToolkit" tagprefix="cc1" %>

<div id="PaymentPlanSelector" data-replace="PaymentPlans" data-parser="PaymentPlanParser">
	<uc2:PaymentPlanSelector ID="PaymentPlanSelector" runat="server" 
		OnPaymentPlanSelected="PaymentPlanSelector_PaymentPlanSelected" />        
</div>

<div data-replace="ViewItems">
    <div class="categoryDescription" data-html="categoryDescription">
        <asp:Literal runat="server" ID="CategoryDescription" />
    </div>

<div id="SalesChannelDetailRepeater">
	<asp:Repeater
		ID="SalesChannelDetailRepeater"
		runat="server" 
		OnItemDataBound="SalesChannelDetailRepeater_ItemDataBound">
		<ItemTemplate>
			<span><asp:PlaceHolder ID="PromotionOffersListPlaceHolder" runat="server" /></span>
			<asp:HiddenField ID="SCDID" runat="server" />
			<asp:PlaceHolder ID="PLUPresenterPlaceHolder" runat="server" />
		</ItemTemplate>
	</asp:Repeater>
</div>
<div id="UpsellOptions">
	<uc3:UpsellOptions ID="UpsellOptionsControl" runat="server" OnPLUSelected="UpsellOptions_PLUSelected" />
</div>
<br />
<uc3:ItemVariations ID="ItemVariationsControl" runat="server" OnPLUSelected="ItemVariations_PLUSelected" />    
<div id="AddToCart" class="text-right" data-el='add-to-cart'>
	<asp:Button ID="AddToCartButton" runat="server" OnClick="PLUPresenter_AddToCart" />
</div>

</div>
<uc4:EventsDateTimeSelectorModal
	ID="EventsDateTimeSelectorModal"
	runat="server"
	Visible="false"
	OnSelectionChanged="SelectionChanged" />
<uc5:DateSpecificSelectorModal
	ID="DateSpecificSelectorModal"
	runat="server"
	Visible="false"
	OnSelectionChanged="SelectionChanged" />
<uc6:MultiTimeEventsSelectorModal 
	ID="MultiTimeEventsSelectorModal" 
	runat="server"
	Visible="false"
	OnSelectionChanged="MultiTimeEventsSelectionChanged" />