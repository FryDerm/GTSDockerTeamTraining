<%@ Control Language="C#" AutoEventWireup="true" Inherits="Gateway.WebStore.PromotionOfferValidator" Codebehind="PromotionOfferValidator.ascx.cs" %>
<asp:Panel id="PromotionCode" runat="server" DefaultButton="SubmitButton">
    <div id="PromotionOfferValidator">
	    <table>
		    <tr>
			    <td colspan="2">
				    <span data-text="PromotionTitle"><asp:Literal ID="TitleLiteral" runat="server" /></span>
			    </td>
		    </tr>
			<tr>
			    <td colspan="2">
				    <span data-el="PromotionImage"><asp:Image ID="PromotionLogo" runat="server" /></span>
			    </td>
		    </tr>
	       <tr>
			    <td colspan="2"> 
				    <span data-html="Description"><asp:Literal ID="TextLiteral" runat="server" /></span>
			    </td>
		    </tr>
		     <tr>
			    <td><span data-text="CouponCodeLabel"><asp:Literal ID="CouponCodeLiteral" runat="server" /></span></td>
			    <td><span data-el="CouponCodeText"><asp:TextBox ID="CouponCodeTextBox" runat="server" /></span></td>
		    </tr> 
		    <tr id="ValidationRow" runat="server" >
			    <td>
				    <span data-text="ValidationLabel"><asp:Literal ID="ValidationTextLiteral" runat="Server" /></span>
			    </td>
			    <td>
				    <span data-el="ValidationText"><asp:TextBox ID="ValidationTextBox" runat="server" /></span>
			    </td>
		    </tr>
		    <tr>
			    <td colspan="2" align="center">
				    <span data-text="PromotionHelp">
						<asp:LinkButton ID="PromotionOfferHelpLinkButton" runat="server" Visible="false" OnClientClick="window.open('PromotionPopUp.aspx?{0}={1}', 'ItemDetail', 'menubar=yes,scrollbars=yes,resizable=yes,width=480,height=560,top=0,left=0');return false;" />
					</span>
			    </td>
		    </tr>
		    <tr>
			    <td colspan="2" align="center">
				    <span data-el="SubmitButton"><asp:Button ID="SubmitButton" runat="server" OnClick="SubmitButton_Click" /></span>
			    </td>
		    </tr>
	    </table>
	</div>
</asp:Panel>