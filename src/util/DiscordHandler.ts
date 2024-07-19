import { DiscordSDK } from '@discord/embedded-app-sdk'
import {
  DiscordActivityInstanceParticipants,
  DiscordAuthResponse,
  DiscordChannelResponse,
} from './DiscordSdkTypes'

const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID

export default class DiscordHandler {
  discordSdk: DiscordSDK
  discordReady: boolean
  discordAuth?: DiscordAuthResponse
  discordChannel?: DiscordChannelResponse
  discordParticipants?: DiscordActivityInstanceParticipants[]

  constructor() {
    this.discordSdk = new DiscordSDK(DISCORD_CLIENT_ID)
    this.discordReady = false
  }

  /**
   * Request an access token
   */
  async authorize(): Promise<DiscordAuthResponse> {
    const { code } = await this.discordSdk.commands.authorize({
      client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
      response_type: 'code',
      state: '',
      prompt: 'none',
      scope: ['identify', 'guilds'],
    })

    const response = await fetch('/api/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    })

    const { access_token } = await response.json()

    let auth = await this.discordSdk.commands.authenticate({
      access_token,
    })

    if (auth == null) {
      throw new Error('Discord SDK Authenticate failed')
    }

    return auth
  }

  /**
   * get current channel details
   */
  async getChannel(): Promise<DiscordChannelResponse> {
    if (this.discordSdk.channelId == null || this.discordSdk.guildId == null) {
      throw new Error('Discord SDK channel or guild ID was null')
    } else {
      return await this.discordSdk.commands.getChannel({
        channel_id: this.discordSdk.channelId,
      })
    }
  }

  async getParticipants(): Promise<DiscordActivityInstanceParticipants[]> {
    try {
      return (await this.discordSdk.commands.getInstanceConnectedParticipants())
        .participants
    } catch (err) {
      throw new Error('Discord SDK failed to get connected participants')
    }
  }

  async init() {
    await this.discordSdk.ready()
    this.discordAuth = await this.authorize()
    this.discordChannel = await this.getChannel()
    this.discordParticipants = await this.getParticipants()
  }

  syncInit() {
    this.init()
  }
}
