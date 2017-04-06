<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SelectLocation.ascx.cs" Inherits="Gateway.Web.UI.Controls.SelectLocation" %>

<div id="SelectLocationTable">
    <div class="page-header">
        <h2><asp:Literal ID="HeaderLiteral" Text="Store and Location Selection" runat="server" /></h2>        
    </div>
    
    <div id="AgencyLiteralCell" >
        <div id="AgencyDropDownListCell" class="form-field">
			<div class="form-field-label"><label for=""><asp:Literal ID="AgencyLiteral" runat="server" Text="Store" /></label></div>
			<div class="form-field-input"><asp:DropDownList ID="AgencyDropDownList" runat="server" AutoPostBack="true" onselectedindexchanged="AgencyDropDownList_SelectedIndexChanged" /></div>
			<div class="clear"></div>
        </div>
    </div>

    <div id="NodeLiteralCell" >
        <div id="NodeDropDownListCell" class="form-field">
		    <div class="form-field-label"><label for=""><asp:Literal ID="NodeLiteral" runat="server" Text="Location" /></label></div>
		    <div class="form-field-input"><asp:DropDownList ID="NodeDropDownList" runat="server" /></div>
		    <div class="clear"></div>
        </div>
    </div>

    <p class="submit-section" id="SelectLocationButtonCell">
        <asp:Button ID="SelectLocationButton" runat="server" Text="Continue" OnClick="SelectLocationButton_Click" CssClass="large-button" />
    </p>
</div>