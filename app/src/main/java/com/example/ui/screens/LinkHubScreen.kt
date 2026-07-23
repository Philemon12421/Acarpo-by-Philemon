package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.RedirectLink
import com.example.ui.components.BannerAdPlaceholder
import com.example.ui.components.FooterView
import com.example.ui.components.RedirectCard

@Composable
fun LinkHubScreen(
    redirects: List<RedirectLink>,
    onOpenRedirectPage: (RedirectLink) -> Unit,
    onShowToast: (String) -> Unit,
    onNavigateLegal: (String) -> Unit,
    onSubscribeNewsletter: (String) -> Unit
) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .testTag("link_hub_screen_column"),
        contentPadding = PaddingValues(bottom = 32.dp)
    ) {
        item {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(MaterialTheme.colorScheme.surface)
                    .padding(20.dp)
            ) {
                Text(
                    text = "Link Hub & Redirect Engine",
                    fontWeight = FontWeight.ExtraBold,
                    fontSize = 26.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )

                Spacer(modifier = Modifier.height(6.dp))

                Text(
                    text = "Central destination for every link mentioned across YouTube, TikTok, Facebook, Instagram, LinkedIn, X (Twitter), Threads and Blog posts.",
                    fontSize = 13.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    lineHeight = 18.sp
                )
            }
        }

        item {
            Box(modifier = Modifier.padding(16.dp)) {
                BannerAdPlaceholder(label = "Link Hub Header Sponsor Slot")
            }
        }

        items(redirects) { link ->
            Box(modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)) {
                RedirectCard(
                    redirect = link,
                    onOpenRedirectPage = { onOpenRedirectPage(link) },
                    onShowToast = onShowToast
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(24.dp))
            FooterView(
                onNavigateLegal = onNavigateLegal,
                onSubscribeNewsletter = onSubscribeNewsletter
            )
        }
    }
}
