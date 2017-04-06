<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UpdateProgressControl.ascx.cs" Inherits="Gateway.Web.UI.Controls.UpdateProgressControl" %>
<asp:UpdateProgress ID="UpdateProgress" runat="server" DisplayAfter="300" DynamicLayout="True">
	<ProgressTemplate>
		<div class="updateProgress">
			<asp:Image ID="UpdateProgressImage" runat="server" ImageUrl="~/images/GTS/ajax-loading.gif" />
		</div>
		<div class="updateBackground"></div>
	</ProgressTemplate>
</asp:UpdateProgress>