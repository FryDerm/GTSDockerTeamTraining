<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ItemVariations.ascx.cs" Inherits="Gateway.Web.UI.Controls.ItemVariations" %>
<asp:Panel id="ItemVariationsPanel" runat="server" width="100%" CssClass="ItemVariationsPanel">
    <asp:Literal ID="ItemVariationsHeader" runat="server" /><br /><br />
	<asp:Repeater ID="ItemVariationsRepeater" runat="server" OnItemDataBound="ItemVariationsRepeater_ItemDataBound">
		<HeaderTemplate>
		    <ul id="ItemVariationsList">
		</HeaderTemplate>
		<ItemTemplate>
		        <li>
                    <table cellpadding="0" cellspacing="0" class="ItemVariationTable">
			            <tr>
			                <td valign="middle">
				                <asp:RadioButton ID="ItemVariationRadioButton" runat="server"
				                    OnCheckedChanged="ItemVariationCheckBox_CheckedChanged" GroupName="ItemVariationRadioButtons" />&nbsp;
			                </td>
				            <td valign="middle">
				                <asp:Image ID="ItemVariationImage" runat="server" />&nbsp;
				            </td>
				        </tr>
				        <tr>
				            <td valign="top" class="ItemVariationDescriptionCell"><asp:Label ID="DescriptionLabel" runat="server" />&nbsp;</td>
				            <td valign="top" class="ItemVariationPriceTableCell"><asp:Label ID="PriceLabel" runat="server" />&nbsp;</td>
			            </tr>
		            </table>
		        </li>
		</ItemTemplate>
		<FooterTemplate>
		    </ul>
		</FooterTemplate>
	</asp:Repeater>
</asp:Panel>