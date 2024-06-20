<template>
  <div class="mt-10 incognitee-border-gradient">
    <div
      class="flex flex-row justify-between w-full text-center gap-4 container mb-10"
    >
      <div class="currency-box p-3 gap-2 basis-1/2" @click="openAssetsInfo">
        <Polkadot class="w-[30px] h-[30px]" />
        <p class="text-xs">DOT</p>
        <span
          class="inline-flex items-center rounded-lg bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600"
          >coming soon</span
        >
      </div>
      <div
        class="currency-box gap-2 p-3 basis-1/2 border-2 border-incognitee-green"
      >
        <Paseo class="w-[30px] h-[30px]" />
        <p class="text-xs">PAS<br />PASEO</p>
      </div>
      <div class="currency-box gap-2 p-3 basis-1/2" @click="openAssetsInfo">
        <USDC class="w-[30px] h-[30px]" />
        <p class="text-xs">USDC</p>
        <span
          class="inline-flex items-center rounded-lg bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600"
          >coming soon</span
        >
      </div>
    </div>

    <div class="container">
      <div class="w-full bg-incognitee-blue mt-10">
        <div
          class="border bg-incognitee-blue border-incognitee-green rounded-lg p-1"
        >
          <nav class="flex space-x-4" aria-label="Tabs">
            <button
              @click="selectTab('public')"
              :class="[
                currentTab === 'public'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-700',
                'flex-1 py-2 text-sm font-medium   rounded-lg',
              ]"
            >
              Public Balance
            </button>
            <button
              @click="selectTab('private')"
              :class="[
                currentTab === 'private'
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-700',
                'flex-1 py-2 text-sm font-medium rounded-lg',
              ]"
            >
              Private Balance
            </button>
          </nav>
        </div>
      </div>

      <div class="bg-gray-900 flex mt-2">
        <div class="custom-border-gradient">
          <div class="inner-box">
            <div v-if="currentTab === 'public'">
              <!-- Public Balance Content -->

              <div class="text-white mb-6 text-center">
                <div class="">
                  <h3 class="text-sm mb-3">Public Balance</h3>
                  <div v-if="isFetchingPaseoBalance" class="spinner"></div>
                  <div class="text-4xl font-semibold" v-else>
                    {{ accountStore.getPaseoHumanBalance }}
                    <span class="text-sm font-semibold">PAS</span>
                  </div>
                </div>
              </div>
              <div class="mt-10">
                <div
                  class="inner-box flex justify-around text-white py-2 bg-gray-800 rounded-md"
                >
                  <div
                    class="flex flex-col items-center text-center"
                    @click="openShieldOverlay"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 mx-auto mb-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                    <p class="text-xs">Shield</p>
                  </div>
                  <div
                    class="flex flex-col items-center text-center"
                    @click="openFaucetOverlay"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 mx-auto mb-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                    <p class="text-xs">Faucet</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <!-- Private Balance Content -->
              <div class="text-white mb-6 text-center">
                <h3 class="text-sm mb-3" @click="openPrivacyInfo">
                  Private Balance ⓘ
                </h3>
                <div v-if="isFetchingIncogniteeBalance" class="spinner"></div>
                <div class="text-4xl font-semibold" v-else>
                  {{ accountStore.getIncogniteeHumanBalance }}
                  <span class="text-sm font-semibold">PAS</span>
                </div>
              </div>
              <div class="mt-10">
                <div
                  class="inner-box flex justify-around text-white py-2 bg-gray-800 rounded-md"
                >
                  <div
                    class="flex flex-col items-center text-center"
                    @click="openPrivateSendOverlay"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 mx-auto mb-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                      />
                    </svg>
                    <p class="text-xs">Send</p>
                  </div>

                  <div
                    class="flex flex-col items-center text-center"
                    @click="openReceiveOverlay"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 mx-auto mb-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                    <p class="text-xs">Receive</p>
                  </div>

                  <div
                    class="flex flex-col items-center text-center"
                    @click="openUnshieldOverlay"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6 mx-auto mb-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <p class="text-xs">Unshield</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="showAssetsInfo">
      <Dialog class="relative z-10" @close="closeAssetsInfo">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="w-full relative transform overflow-hidden rounded-xl bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all flex flex-col sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
              >
                <div class="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500"
                    @click="closeAssetsInfo"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold leading-6 text-white"
                      >Other Assets
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-400 mt-4 text-left">
                        Incognitee is capable of shielding any fungible asset on
                        any substrate-based chain. Stay tuned for dedicated
                        deployments for DOT, KSM, USDC, USDT and others
                      </p>
                      <p class="text-sm text-gray-400 text-left my-4">
                        With further extension, Incognitee will be able to
                        shield BTC, ETH and any other token whose protocol
                        supports light clients
                      </p>
                    </div>
                  </div>
                </div>
                <div class="w-full mt-8 bg-gray-800">
                  <button
                    type="button"
                    class="btn btn_gradient inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    @click="closeAssetsInfo"
                  >
                    Got it!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="showPrivacyInfo">
      <Dialog class="relative z-10" @close="closeOnOutsideClick">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex items-start justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="w-full relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
              >
                <div class="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    class="text-gray-400 hover:text-gray-500"
                    @click="closePrivacyInfo"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-white"
                    >On Privacy
                  </DialogTitle>

                  <div class="mt-2">
                    <p class="text-sm text-gray-400 mt-4 text-justify">
                      Incognitee enhances your privacy while dealing with
                      digital assets. But what does privacy mean and how does
                      incognitee improve privacy?
                    </p>
                    <p class="text-sm text-gray-400 text-justify my-4">
                      First, let's explore why digital assets are generally
                      <b>not</b> private. When dealing with crypto assets, your
                      account is a pseudonym on a public ledger, much like a
                      bank account number. Every single transaction this account
                      does will be stored publicly forever and you have no right
                      for deletion of the trace you left. If, at a certain point
                      in time your pseudonym can be linked to your identity -
                      i.e. because you send tokens to someone else - your entire
                      behavioral history is revealed as is your balance.
                    </p>
                    <p class="text-sm text-gray-400 text-justify my-4">
                      <NuxtLink to="https://incognitee.io" class="color_blue"
                        >Incognitee
                      </NuxtLink>
                      is a privacy enhancing technology that allows you to
                      shield your assets and transfer them privately. This means
                      that you can send tokens to someone else without revealing
                      your balance or transaction history. The recipient will
                      not be able to see your balance or transaction history
                      either. This is achieved by using a technology called
                      <NuxtLink
                        to="https://docs.integritee.network/2-integritee-network/2.7-privacy-technology-trusted-execution-environments"
                        class="color_blue"
                        >trusted execution environments (TEE)
                      </NuxtLink>
                      . The TEEs we use are a hardware feature of server CPU's
                      called <i>Intel SGX</i>. In addition, the
                      <NuxtLink
                        to="https://docs.integritee.network/2-integritee-network"
                        class="color_blue"
                        >Integritee Network
                      </NuxtLink>
                      , a Polkadot parachain, performs independent,
                      decentralized remote attestation of TEEs. Moreover, it
                      gives finality to Incognitee sidechain blocks.
                    </p>
                    <p class="text-sm text-gray-400 mt-4 text-justify">
                      Incognitee is a layer 2 solution, maintaining a private
                      ledger secured by TEE. All your transactions are
                      confidential, only known to and the person your
                      transacting with. Sender, recipient and amount are
                      invisible to the public and even to the operators of
                      Incognitee infrastructure.
                    </p>
                    <p class="text-sm text-gray-400 mt-4 text-justify">
                      For maximal privacy, we suggest to shield your assets to
                      incognitee and from then on transact them on incognitee
                      only. If you need to unshield back to L1, you can still
                      benefit from k-anonymity: the public just sees that
                      someone out of <i>k</i> individuals is the originator of
                      an unshielding event. If <i>k</i> is large enough, you can
                      plausibly deny it was you. You can influence the size of
                      <i>k</i> by choosing popular amounts and timing.
                    </p>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="btn btn_gradient inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                    @click="closePrivacyInfo"
                  >
                    Got it!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="showShieldOverlay">
      <Dialog class="relative z-20" @close="closeShieldOverlay">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="w-full relative transform overflow-hidden rounded-xl bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all flex flex-col sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closeShieldOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-3 text-center sm:mt-5 flex-grow">
                <DialogTitle
                  as="h3"
                  class="text-base font-semibold leading-6 text-white"
                  >Shield PAS
                </DialogTitle>

                <p class="text-sm text-gray-400 text-left my-4">
                  Shielding is the process of moving naked, publicly visible
                  balance on Paseo to your private wallet on Incognitee.
                </p>

                <form
                  @submit.prevent="submitShieldForm"
                  class="flex-grow flex flex-col justify-between"
                >
                  <div>
                    <div class="flex justify-between items-center mt-4">
                      <label
                        for="sendAmount"
                        class="text-sm font-medium leading-6 text-white"
                        >PAS Amount</label
                      >

                      <span class="text-xs text-gray-400"
                        >Available public balance:
                        {{ accountStore.getPaseoHumanBalance }}</span
                      >
                    </div>
                    <input
                      id="shieldAmount"
                      v-model="shieldAmount"
                      type="number"
                      step="0.01"
                      :min="0.1"
                      :max="
                        (accountStore.paseoBalance -
                          existential_deposit_paseo) /
                          Math.pow(10, 10) -
                        0.1
                      "
                      required
                      class="w-full text-sm rounded-lg flex-grow py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 text-right"
                      style="border-color: #24ad7c"
                    />
                    <div class="text-right">
                      <span class="text-xs text-gray-400"
                        >Fee: 16 mPAS for Paseo, 0.175% for Incognitee</span
                      >
                    </div>
                  </div>
                  <div class="bottom-0 left-0 w-full mt-8 bg-gray-800">
                    <button
                      type="submit"
                      class="btn btn_gradient inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      @click="submitShieldForm"
                    >
                      Shield
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="showFaucetOverlay">
      <Dialog class="relative z-20" @close="closeFaucetOverlay">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="w-full relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all flex flex-col sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closeFaucetOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-grow">
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-white"
                    >Drip Faucet
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-400">
                      The Paseo Faucet grants you PAS tokens every day. Just
                      copy-paste your address and solve a CAPTCHA to get free
                      PAS tokens
                    </p>

                    <div class="flex flex-col mt-5">
                      <div class="relative flex items-center rounded-lg">
                        <input
                          id="accountAddress"
                          type="text"
                          :value="accountStore.getAddress"
                          readonly
                          class="w-full text-sm rounded-lg flex-grow pr-14 py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 truncate-input"
                          style="border-color: #24ad7c"
                        />
                        <div class="absolute right-3 flex space-x-2">
                          <div
                            @click="copyOwnAddressToClipboard"
                            class="cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <a href="https://faucet.polkadot.io/paseo" target="_blank">
                  <button
                    type="button"
                    class="btn btn_gradient inline-flex w-full justify-center rounded-md px-3 py-3 mt-8 text-sm font-semibold text-white shadow-sm"
                  >
                    Get free PAS tokens from faucet
                  </button>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot
      as="template"
      :show="showUnshieldOverlay && !showScanOverlay"
    >
      <Dialog class="relative z-10" @close="closeUnshieldOverlay">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-full max-w-sm mx-auto bg-gray-800 rounded-lg shadow-xl flex flex-col px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closeUnshieldOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-base font-semibold leading-6 text-white"
                  >Unshield PAS
                </DialogTitle>
                <div class="mt-5">
                  <p class="text-sm text-gray-400 text-left my-4">
                    Unshielding is the process of moving funds from your private
                    balance on Incognitee to publicly visible (naked) Paseo.
                  </p>
                </div>
                <form class="mt-5" @submit.prevent="submitUnshieldForm">
                  <div class="flex flex-col">
                    <label
                      for="recipientAddress"
                      class="text-sm font-medium leading-6 text-white text-left"
                      >Recipient</label
                    >
                    <div class="relative flex items-center rounded-lg">
                      <div class="absolute left-3 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-6 w-6 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.9889 0L0.0222883 5.99115L0 18.0089L12.0111 24L23.9778 18.0089L24 5.99115L11.9889 0ZM11.9055 2.93685L15.012 4.49375V7.60754L11.9055 9.16444L8.79902 7.60754V4.49375L11.9055 2.93685ZM5.66099 6.0491L8.76754 7.606V10.7198L5.66099 12.2767L8.76749 13.8336V16.9489L5.66093 18.5058L2.55438 16.9489V13.8336L5.66087 12.2767L2.55438 10.7198V7.606L5.66087 6.0491H5.66099ZM18.1278 6.0491L21.2343 7.606V10.7198L18.1279 12.2767L21.2344 13.8336V16.9489L18.1279 18.5058L15.0214 16.9489V13.8336L18.1279 12.2767L15.0214 10.7198V7.606L18.1278 6.0491ZM11.9055 9.16928L15.012 10.7262V13.84L11.913 15.3937L15.012 16.9457V20.0611L11.9055 21.618L8.79902 20.0611V16.9457L11.898 15.3937L8.79902 13.84V10.7262L11.9055 9.16928H11.9055Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <input
                        id="recipientAddress"
                        v-model="recipientAddress"
                        type="text"
                        required
                        placeholder="Recipient"
                        class="w-full text-sm rounded-lg flex-grow pl-12 py-2 pr-20 bg-cool-900 text-white placeholder-gray-500 border border-green-500 truncate-input"
                        style="border-color: #24ad7c"
                      />
                      <div class="absolute right-3 flex space-x-2">
                        <div
                          @click="setRecipientAddressToSelf"
                          class="cursor-pointer"
                        >
                        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-6 w-6 text-white"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                        </div>
                        <div @click="openScanOverlay" class="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-6 w-6 text-white"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p class="text-sm text-gray-400 text-left mt-5">
                    For optimal k-anonymity, we advise you to unshield exactly
                    10 PAS at the time. In the future we will provide a score
                    including timing and popular amounts to enhance
                    unlinkability of your actions.
                  </p>

                  <div class="flex justify-between items-center mt-5">
                    <label
                      for="unshieldAmount"
                      class="text-sm font-medium leading-6 text-white"
                      >PAS Amount</label
                    >

                    <span class="text-xs text-gray-400"
                      >Available private balance:
                      {{ accountStore.getIncogniteeHumanBalance }}</span
                    >
                  </div>
                  <input
                    id="unshieldAmount"
                    v-model="unshieldAmount"
                    type="number"
                    step="0.1"
                    :min="1.1"
                    :max="
                      accountStore.incogniteeBalance / Math.pow(10, 10) - 0.1
                    "
                    required
                    class="w-full text-sm rounded-lg flex-grow py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 text-right"
                    style="border-color: #24ad7c"
                  />
                  <!-- Fee description -->
                  <div class="text-right">
                    <span class="text-xs text-gray-400"
                      >Fee: 30m PAS for Incognitee</span
                    >
                  </div>

                  <div class="mt-8 w-full bg-gray-800">
                    <button
                      type="submit"
                      class="btn btn_gradient inline-flex w-full justify-center rounded-md text-sm font-semibold text-white shadow-sm"
                    >
                      Unshield
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="showReceiveOverlay">
      <Dialog
        class="fixed inset-0 z-20 flex items-center justify-center"
        @close="closeReceiveOverlay"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="w-full relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all flex flex-col sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closeReceiveOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-grow flex flex-col justify-start">
                <!-- Anpassung hier -->
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-white"
                  >
                    Receive
                  </DialogTitle>
                  <div class="mt-5">
                    <p class="text-sm text-gray-400 text-left my-4">
                      Share your address with the sender. You can either have
                      them scan this QR code or send them a private message.
                    </p>
                  </div>
                  <div class="mt-5 qrcode-container">
                    <qrcode :value="accountStore.getAddress"></qrcode>
                  </div>

                  <div class="flex flex-col mt-5">
                    <div
                      class="w-full mt-5 mb-2 text-sm font-medium leading-6 text-white font-semibold"
                    >
                      Your address:
                    </div>
                    <div class="relative flex items-center rounded-lg">
                      <input
                        id="accountAddress"
                        type="text"
                        :value="accountStore.getAddress"
                        readonly
                        class="w-full text-sm rounded-lg flex-grow pr-14 py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 truncate-input"
                        style="border-color: #24ad7c"
                      />
                      <div class="absolute right-3 flex space-x-2">
                        <div
                          @click="copyOwnAddressToClipboard"
                          class="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot
      as="template"
      :show="showPrivateSendOverlay && !showScanOverlay"
    >
      <Dialog class="relative z-20" @close="closePrivateSendOverlay">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="w-full relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all flex flex-col sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closePrivateSendOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex-grow">
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-white"
                    >Send Privately
                  </DialogTitle>
                  <div class="mt-5">
                    <p class="text-sm text-gray-400 text-left my-4">
                      Sending privately means that only you and the recipient
                      know who sent how much to whom.
                    </p>
                  </div>
                  <form class="mt-5" @submit.prevent="submitSendForm">
                    <div class="flex flex-col">
                      <label
                        for="recipientAddress"
                        class="text-sm font-medium leading-6 text-white text-left"
                        >Recipient</label
                      >
                      <div class="relative flex items-center rounded-lg">
                        <input
                          id="recipientAddress"
                          v-model="recipientAddress"
                          type="text"
                          required
                          class="w-full text-sm rounded-lg flex-grow py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 truncate-input pr-12"
                          style="border-color: #24ad7c"
                          placeholder="Recipient"
                        />
                        <div class="absolute right-3 flex space-x-2">
                          <div @click="openScanOverlay" class="cursor-pointer">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="h-6 w-6 text-white"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-10">
                      <!-- Label and available balance -->
                      <div class="flex justify-between items-center">
                        <label
                          for="sendAmount"
                          class="text-sm font-medium leading-6 text-white"
                          >PAS Amount</label
                        >

                        <span class="text-xs text-gray-400"
                          >Available private balance:
                          {{ accountStore.getIncogniteeHumanBalance }}</span
                        >
                      </div>

                      <!-- Input field -->
                      <div>
                        <input
                          id="sendAmount"
                          v-model="sendAmount"
                          type="number"
                          step="0.01"
                          :min="0.1"
                          :max="
                            accountStore.incogniteeBalance / Math.pow(10, 10) -
                            0.1
                          "
                          required
                          class="w-full text-sm rounded-lg flex-grow py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 text-right"
                          style="border-color: #24ad7c"
                          placeholder="Amount"
                        />
                      </div>

                      <!-- Fee description -->
                      <div class="text-right">
                        <span class="text-xs text-gray-400"
                          >Fee: 10m PAS for Incognitee</span
                        >
                      </div>
                    </div>

                    <div class="mt-8 bottom-0 left-0 w-full bg-gray-800">
                      <button
                        type="submit"
                        class="btn btn_gradient inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                      >
                        Transfer
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="showScanOverlay">
      <Dialog class="relative z-20" @close="closeScanOverlay">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="w-full relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closeScanOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div class="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  class="text-base font-semibold leading-6 text-white"
                  >Scan recipient's QR code
                </DialogTitle>

                <div class="mt-6 qrcode-container">
                  <qrcode-stream @detect="onDecode"></qrcode-stream>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <TransitionRoot as="template" :show="showNewWalletOverlay">
      <Dialog class="relative z-10" @close="closeNewWalletOverlay">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-80 transition-opacity"
          />
        </TransitionChild>

        <div
          class="fixed inset-0 z-10 w-screen flex items-center justify-center p-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  class="text-gray-400 hover:text-gray-500"
                  @click="closeNewWalletOverlay"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                >
                  <CheckIcon
                    class="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>

                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-white"
                    >New Wallet!
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-400">
                      We have created a new wallet for you.
                    </p>

                    <div class="flex flex-col mt-5">
                      <div class="relative flex items-center rounded-lg">
                        <input
                          id="accountAddress"
                          type="text"
                          :value="accountStore.getAddress"
                          readonly
                          class="w-full text-sm rounded-lg flex-grow pr-14 py-2 bg-cool-900 text-white placeholder-gray-500 border border-green-500 truncate-input"
                          style="border-color: #24ad7c"
                        />
                        <div class="absolute right-3 flex space-x-2">
                          <div
                            @click="copyOwnAddressToClipboard"
                            class="cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="mt-5">
                      <a
                        href="https://faucet.polkadot.io/paseo"
                        target="_blank"
                      >
                        <button
                          type="button"
                          class="btn btn_gradient inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm"
                        >
                          Get free PAS tokens from faucet
                        </button>
                      </a>
                    </div>
                    <p class="text-sm text-gray-400 mt-4 text-left">
                      In order to keep your wallet, please store a bookmark to
                      the current url which includes your secret
                      <strong>NOW</strong>. (i.e. type Ctrl+D to bookmark this
                      page). If you lose the bookmark, you will lose access to
                      your wallet. If you share your personal url with others,
                      they can spend your funds. The purpose of this demo is not
                      security but optimal user experience for testing purposes.
                    </p>
                    <p class="text-sm text-gray-400 text-left my-4">
                      You will have zero funds. Please tap "Get free PAS tokens
                      from faucet" and go to Paseo Faucet to get your first PAS
                      tokens.
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <div
      aria-live="assertive"
      class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
        <!-- Notification panel, dynamically insert this into the live region when it needs to be displayed -->
        <transition
          enter-active-class="transform ease-out duration-300 transition"
          enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="showStatusOverlay"
            class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="p-4">
              <div class="flex items-center">
                <div class="flex w-0 flex-1 justify-between">
                  <p class="w-0 flex-1 text-sm font-medium text-gray-900">
                    {{ txStatus }}
                  </p>
                </div>
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    @click="showStatusOverlay = false"
                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Close</span>
                    <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/20/solid"

import Paseo from "@/assets/img/paseo-logo.svg"
import Polkadot from "@/assets/img/polkadot-logo.svg"
import USDC from "@/assets/img/usdc-logo.svg"

import { useAccount } from "@/store/account.ts"
import { useIncognitee } from "@/store/incognitee.ts"
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { CheckIcon } from "@heroicons/vue/24/outline"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { Keyring } from "@polkadot/keyring"
import { formatBalance, hexToU8a, u8aToHex } from "@polkadot/util"
import {
  cryptoWaitReady,
  mnemonicGenerate,
  mnemonicToMiniSecret,
} from "@polkadot/util-crypto"
import { useInterval } from "@vueuse/core"
import { onMounted, ref, watch } from "vue"
import Qrcode from "vue-qrcode"
import { QrcodeStream } from "vue-qrcode-reader"
import { useRouter } from "vue-router"

const router = useRouter();
const accountStore = useAccount();
const incogniteeStore = useIncognitee();
const isFetchingPaseoBalance = ref(true);
const isFetchingIncogniteeBalance = ref(true);

const existential_deposit_paseo = 10000000000;
const txStatus = ref("");
const recipientAddress = ref("");
const sendAmount = ref("");
const shieldAmount = ref("");
const unshieldAmount = ref("");
const scanResult = ref("No QR code data yet");

let api: ApiPromise | null = null;

const tabs = [
  { name: "Public Balance", href: "#", current: true },
  { name: "Private Balance", href: "#", current: false },
];

const currentTab = ref("public");

const selectTab = (tab) => {
  currentTab.value = tab;
};

const submitSendForm = () => {
  // Handle the form submission here
  console.log("submitting send form");
  openStatusOverlay();
  closePrivateSendOverlay();
  sendPrivately();
};
const submitShieldForm = () => {
  // Handle the form submission here
  openStatusOverlay();
  closeShieldOverlay();
  shield();
};
const submitUnshieldForm = () => {
  // Handle the form submission here
  openStatusOverlay();
  closeUnshieldOverlay();
  unshield();
};

const setRecipientAddressToSelf = () => {
  recipientAddress.value = accountStore.getAddress;
};

const onDecode = (decodeResult) => {
  console.log("QR scan decoded: " + decodeResult[0].rawValue);
  scanResult.value = decodeResult[0].rawValue;
  recipientAddress.value = decodeResult[0].rawValue;
  closeScanOverlay();
};

const txResHandlerPaseo = ({ events = [], status, txHash }) => {
  status.isFinalized
    ? (txStatus.value = `😀 Finalized. You should see your Incognitee balance increase in seconds. Please move to the Private Balance tab`)
    : (txStatus.value = `⌛ Current transaction status: ${status.type}. please be patient a few more seconds. you should see your Paseo balance going down`);

  // Loop through Vec<EventRecord> to display all events
  events.forEach(({ _, event: { data, method, section } }) => {
    if (section + ":" + method === "system:ExtrinsicFailed") {
      // extract the data for this event
      const [dispatchError, dispatchInfo] = data;
      console.log(`dispatchinfo: ${dispatchInfo}`);
      let errorInfo;

      // decode the error
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        // (For specific known errors, we can also do a check against the
        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
        const mod = dispatchError.asModule;
        const error = api.registry.findMetaError(
          new Uint8Array([
            mod.index.toNumber(),
            bnFromHex(mod.error.toHex().slice(0, 4)).toNumber(),
          ]),
        );
        const message = `${error.section}.${error.name}${
          Array.isArray(error.docs)
            ? `(${error.docs.join("")})`
            : error.docs || ""
        }`;

        errorInfo = `${message}`;
        console.log(`Error-info::${JSON.stringify(error)}`);
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        errorInfo = dispatchError.toString();
      }
      txStatus.value = `😞 Transaction Failed! ${section}.${method}::${errorInfo}`;
    } else if (section + ":" + method === "system:ExtrinsicSuccess") {
      txStatus.value`❤️️ Transaction successful!`;
    }
  });
};

const txErrHandlerPaseo = (err) =>
  (txStatus.value = `😞 Transaction Failed: ${err.toString()}`);
const shield = async () => {
  console.log("shielding .....");
  txStatus.value = "⌛ connecting to Paseo....please be patient";
  if (incogniteeStore.vault) {
    const balance = accountStore.paseoBalance;
    const amount = Math.pow(10, 10) * shieldAmount.value;
    console.log(`sending ${amount} to vault: ${incogniteeStore.vault}`);
    const wsProvider = new WsProvider("wss://rpc.ibp.network/paseo");
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log("api initialized for shielding");
    await api.tx.balances
      .transferKeepAlive(incogniteeStore.vault, amount)
      .signAndSend(accountStore.account, txResHandlerPaseo)
      .catch(txErrHandlerPaseo);
  }
};

const unshield = () => {
  console.log("will unshield 30% of your private funds to same account on L1");
  txStatus.value = "⌛ will unshield to L1";
  const balance = accountStore.incogniteeBalance;
  const amount = Math.pow(10, 10) * unshieldAmount.value;
  const signer = accountStore.account;
  console.log(
    `sending ${formatBalance(amount)} from ${
      signer.address
    } privately to ${recipientAddress.value} on L1 (shard: ${incogniteeStore.shard}`,
  );
  incogniteeStore.api
    .balanceUnshieldFunds(
      signer,
      incogniteeStore.shard,
      incogniteeStore.fingerprint,
      signer.address,
      recipientAddress.value,
      amount,
    )
    .then((hash) => {
      txStatus.value = "😀 Triggered unshielding of funds successfully.";
      console.log(`trustedOperationHash: ${hash}`);
    });
};

const sendPrivately = () => {
  console.log("sending funds on incognitee");
  txStatus.value = "⌛ sending funds privately on incognitee";
  const amount = Math.pow(10, 10) * sendAmount.value;
  const signer = accountStore.account;
  console.log(
    `sending ${formatBalance(amount)} from ${signer.address} privately to ${recipientAddress.value}`,
  );
  incogniteeStore.api
    .trustedBalanceTransfer(
      signer,
      incogniteeStore.shard,
      incogniteeStore.fingerprint,
      signer.address,
      recipientAddress.value,
      amount,
    )
    .then((hash) => {
      console.log(`trustedOperationHash: ${hash}`);
      txStatus.value = "😀 Success";
    });
};

const fetchIncogniteeBalance = async () => {
  if (!incogniteeStore.apiReady) return;
  if (!accountStore.account) return;
  incogniteeStore.api
    .getBalance(accountStore.account, incogniteeStore.shard)
    .then((balance) => {
      console.log(
        `current account balance L2: ${balance} on shard ${incogniteeStore.shard}`,
      );
      accountStore.setIncogniteeBalance(balance);
      isFetchingIncogniteeBalance.value = false;
    });
};

const pollCounter = useInterval(2000);

watch(pollCounter, async () => {
  console.log("ping: " + pollCounter.value);
  await fetchIncogniteeBalance();
});

watch(accountStore, async () => {
  //todo! only reinitialize if account changes
  if (accountStore.getAddress === "none") {
    console.log("skipping api init. no address");
    return;
  }
  if (api?.isReady) {
    console.log(
      "skipping api init. It seems the Paseo api is already subscribed to balance changes",
    );
    return;
  }

  console.log("trying to init api");
  const wsProvider = new WsProvider("wss://rpc.ibp.network/paseo");
  api = await ApiPromise.create({ provider: wsProvider });
  api.query.system.account(
    accountStore.account.address,
    ({ data: { free: currentFree } }) => {
      console.log("paseo balance:" + currentFree);
      accountStore.paseoBalance = Number(currentFree);
      isFetchingPaseoBalance.value = false;
    },
  );
  // for quicker responsiveness we dont wait until the next regular poll, but trigger the balance fetch here
  fetchIncogniteeBalance().then(() =>
    console.log("fetched incognitee balance"),
  );
});

const copyOwnAddressToClipboard = () => {
  navigator.clipboard
    .writeText(accountStore.getAddress)
    .then(() =>
      alert(
        "copied your account address to clipboard. Please paste it into the address field on the Paseo faucet.",
      ),
    );
};

onMounted(() => {
  incogniteeStore.initializeApi();

  const seedHex = router.currentRoute.value.query.seed;
  if (seedHex) {
    console.log("found seed in url: " + seedHex);
    cryptoWaitReady().then(() => {
      const localKeyring = new Keyring({ type: "sr25519" });
      const account = localKeyring.addFromSeed(hexToU8a(seedHex));
      accountStore.setAccount(account);
    });
  } else {
    console.log("no seed found in url. will automatically create fresh wallet");
    cryptoWaitReady().then(() => {
      const generatedMnemonic = mnemonicGenerate();
      const localKeyring = new Keyring({ type: "sr25519", ss58Format: 42 });
      const newAccount = localKeyring.addFromMnemonic(generatedMnemonic, {
        name: "fresh",
      });
      const seed = mnemonicToMiniSecret(generatedMnemonic);
      const privateKeyHex = u8aToHex(seed);
      console.log(`Private Key in Hex: ${privateKeyHex}`);
      // change url to contain new seed to allow bookmarking
      router.push({
        query: { seed: privateKeyHex },
      });
      accountStore.setAccount(newAccount);
      openNewWalletOverlay();
    });
  }
});

const open = ref(true);

const showAssetsInfo = ref(false);
const openAssetsInfo = () => {
  showAssetsInfo.value = true;
};
const closeAssetsInfo = () => {
  showAssetsInfo.value = false;
};

const showPrivacyInfo = ref(false);
const openPrivacyInfo = () => {
  showPrivacyInfo.value = true;
};
const closePrivacyInfo = () => {
  showPrivacyInfo.value = false;
};
const privacyInfo = ref(null);
const closeOnOutsideClick = (event) => {
  if (event.target === privacyInfo.value) {
    showPrivacyInfo.value = false;
  }
};

const showNewWalletOverlay = ref(false);
const openNewWalletOverlay = () => {
  showNewWalletOverlay.value = true;
};
const closeNewWalletOverlay = () => {
  showNewWalletOverlay.value = false;
};
const showShieldOverlay = ref(false);
const openShieldOverlay = () => {
  showShieldOverlay.value = true;
};
const closeShieldOverlay = () => {
  showShieldOverlay.value = false;
};

const showFaucetOverlay = ref(false);
const openFaucetOverlay = () => {
  showFaucetOverlay.value = true;
};
const closeFaucetOverlay = () => {
  showFaucetOverlay.value = false;
};

const showUnshieldOverlay = ref(false);
const openUnshieldOverlay = () => {
  unshieldAmount.value = null;
  showUnshieldOverlay.value = true;
};
const closeUnshieldOverlay = () => {
  showUnshieldOverlay.value = false;
};
const showReceiveOverlay = ref(false);
const openReceiveOverlay = () => {
  showReceiveOverlay.value = true;
};
const closeReceiveOverlay = () => {
  showReceiveOverlay.value = false;
};
const showPrivateSendOverlay = ref(false);
const openPrivateSendOverlay = () => {
  console.log(`openSendOverlay (scanoverlay=${showScanOverlay.value})`);
  showPrivateSendOverlay.value = true;
};
const closePrivateSendOverlay = () => {
  console.log("closePrivateSendOverlay");
  showPrivateSendOverlay.value = false;
};

const showScanOverlay = ref(false);
const openScanOverlay = () => {
  scanResult.value = "No QR code data yet";
  showScanOverlay.value = true;
};
const closeScanOverlay = () => {
  console.log("closeScanOverlay");
  showScanOverlay.value = false;
};
const showStatusOverlay = ref(false);
const openStatusOverlay = () => {
  showStatusOverlay.value = true;
};
const closeStatusOverlay = () => {
  showStatusOverlay.value = false;
  showPrivateSendOverlay.value = false;
  showShieldOverlay.value = false;
  showUnshieldOverlay.value = false;
};
</script>

<style scoped>
.border-green-500 {
  border-color: #24ad7c;
}

.bg-gray-800 {
  background-color: #1f2937;
}

.text-white {
  color: #ffffff;
}

.wallet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.truncate-input {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.balance {
  font-size: 48px;
  padding: 20px 20px;
}

.balance-naked {
  font-size: 24px;
  padding: 20px 20px;
}

h1 {
  font-size: 1em; /* Adjust as needed */
  font-weight: bold; /* Makes the text bold */
  color: #999; /* Change color as needed */
  text-align: center; /* Centers the text */
  margin-bottom: 20px; /* Adds space below the heading */
}

.currency-selector {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.currency-logo {
  height: 50px; /* Adjust as needed */
  width: 50px; /* Adjust as needed */
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

hr {
  border: none;
  border-top: 1px #222; /* Change color as needed */
  color: #111; /* Change color as needed */
  background-color: #333; /* Change color as needed */
  height: 1px; /* Adjust as needed */
}

.privacy-separator {
  width: 90%;
  text-align: center;
  color: #555;
}

.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert {
  background: #222;
  padding: 20px;
  width: 90%;
  border-radius: 10px;
  overflow: auto;
  max-height: 90%;
}

.action-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.action {
  background: #222;
  padding: 20px;
  width: 90%;
  border-radius: 10px;
  overflow: auto;
  max-height: 90%;
}

.status-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.status {
  background: #269;
  padding: 20px;
  width: 90%;
  border-radius: 10px;
}

.qrcode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.qrcode {
  width: min(90vw, 80vh);
  height: min(90vw, 80vh);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.form-container input {
  background-color: #333;
  color: #fff; /* You might want to change the text color to ensure it's readable against the dark background */
}

.form-container input#amount {
  font-size: 2em; /* Make the font size twice as large */
  text-align: center; /* Center the text */
  width: 50%; /* Reduce the width by 50% */
}

.incognitee-border-gradient {
  width: 100%;
  height: 100%;
  background: url("/img/global/bg-line.svg") no-repeat center center;
  background-size: cover;
}

.spinner {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 1em; /* Adjust the size here */
  height: 1em; /* Adjust the size here */
  animation: spin 2s linear infinite;
  vertical-align: middle; /* Align with the text */
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
