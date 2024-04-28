
import { setup as setupTest } from './support/global-setup'
import { teardownEthereum } from './support/global-teardown'

let setup: Awaited<ReturnType<typeof setupTest>>

describe('ETH', () => {
    jest.setTimeout(5 * 60 * 1000)

    beforeAll(async () => {
        setup = await setupTest()
    })

    afterEach(async () => {
        // await setup.prisma.paymentSystemCryptoWatcherEthBlock.deleteMany()
    })

    afterAll(async () => {
        await teardownEthereum(setup)
    })

    describe('', () => {
        it('', async () => {
            console.log(123)
        })
    })

    // describe(``, () => {
    //     let nc: NatsConnection
    //     let jsm: JetStreamManager
    //     let jetstream: JetStreamClient

    //     beforeAll(async () => {
    //         nc = await natsConnect({ servers: setup.natsServerUrls })
    //         jsm = await nc.jetstreamManager()
    //         jetstream = nc.jetstream()
    //     })

    //     afterEach(async () => {
    //         const streamNameItems = await jsm.streams.names().next()

    //         for (const streamName of streamNameItems) {
    //             const consumerInfoItems = await jsm.consumers.list(streamName).next()

    //             for (const consumerInfo of consumerInfoItems) {
    //                 const consumer = await jetstream.consumers.get(setup.NATS_STREAM_NAME, consumerInfo.name)

    //                 await consumer.delete()
    //             }

    //             await jsm.streams.purge(streamName)
    //         }
    //     })

    //     it(`Должна смениться нода подписок, если текущая отстала больше чем на EVM_NODE_MAX_BLOCK_LAG`, async () => {
    //         const healthResult_1 = await utils.natsRequest<EvmNatsControllerTypes.Health.Result>(
    //             `rpc.v1.${setup.NATS_STREAM_NAME}.health`,
    //         )(nc)

    //         await utils.mineWithDelay(utils.getProvider(nodeNames.find(i => i !== healthResult_1.activeSubscriptionsNodeName)), 4)

    //         await new Promise(r => setTimeout(r, 3000))

    //         const healthResult_2 = await utils.natsRequest<EvmNatsControllerTypes.Health.Result>(
    //             `rpc.v1.${setup.NATS_STREAM_NAME}.health`,
    //         )(nc)

    //         expect(healthResult_1.activeSubscriptionsNodeName).not.toEqual(healthResult_2.activeSubscriptionsNodeName)
    //     })

    //     it(`При смене ноды подписок, новые блоки, полученные с новой ноды, должны корректно парсится и сохраняться в БД`, async () => {
    //         const healthResult_1 = await utils.natsRequest<EvmNatsControllerTypes.Health.Result>(
    //             `rpc.v1.${setup.NATS_STREAM_NAME}.health`,
    //         )(nc)

    //         const newProviderName = nodeNames.find(i => i !== healthResult_1.activeSubscriptionsNodeName)
    //         const newProvider = utils.getProvider(newProviderName)

    //         await utils.mineWithDelay(newProvider, 10)

    //         const healthResult_2 = await utils.natsRequest<EvmNatsControllerTypes.Health.Result>(
    //             `rpc.v1.${setup.NATS_STREAM_NAME}.health`,
    //         )(nc)

    //         await new Promise(r => setTimeout(r, 3000))

    //         const blockNumber = await newProvider.getBlockNumber()
    //         const blockFromDb = await setup.prisma.paymentSystemCryptoWatcherEthBlock.findFirst({
    //             where: { number: blockNumber },
    //         })

    //         /**
    //          * Проверяем что нода действительно изменилась
    //          */
    //         expect(healthResult_1.activeSubscriptionsNodeName).not.toBe(healthResult_2.activeSubscriptionsNodeName)

    //         /**
    //          * Проверяем что текущий актуальный блок новой ноды есть в БД и он спарсился
    //          */
    //         expect(blockFromDb?.parsedDate).not.toBe(null)
    //         expect(blockFromDb?.parsedDate).not.toBe(undefined)
    //     })

    //     it('Импортировать адрес и получать сообщения о трансферах ETH, относящихся к этому адресу', async () => {
    //         const healthResult_1 = await utils.natsRequest<EvmNatsControllerTypes.Health.Result>(
    //             `rpc.v1.${setup.NATS_STREAM_NAME}.health`,
    //         )(nc)

    //         const providerName = nodeNames.find(i => i === healthResult_1.activeSubscriptionsNodeName)
    //         const provider = utils.getProvider(providerName)

    //         const wallet_1 = new ethers.Wallet(setup.ADDRESS_ITEMS[0].privateKey, provider)
    //         const wallet_2 = new ethers.Wallet(setup.ADDRESS_ITEMS[1].privateKey, provider)
    //         const addressKey_1 = randomUUID().split('-').pop()
    //         const addressKey_2 = randomUUID().split('-').pop()
    //         const consumerName_1 = randomUUID().split('-').pop()
    //         const consumerName_2 = randomUUID().split('-').pop()
    //         const subject_1 = `v1.${setup.NATS_STREAM_NAME}.${addressKey_1}.transactions`
    //         const subject_2 = `v1.${setup.NATS_STREAM_NAME}.${addressKey_2}.transactions`
    //         const amountInWei = new BigNumber('2').multipliedBy(`1e18`).toFixed()

    //         // Импортируем оба адреса, чтобы получать по ним сообщения
    //         await utils.natsRequest(`rpc.v1.${setup.NATS_STREAM_NAME}.importAddress`, [
    //             {
    //                 address: wallet_1.address,
    //                 key: addressKey_1,
    //             },
    //         ])(nc)
    //         await utils.natsRequest(`rpc.v1.${setup.NATS_STREAM_NAME}.importAddress`, [
    //             {
    //                 address: wallet_2.address,
    //                 key: addressKey_2,
    //             },
    //         ])(nc)

    //         // Подключаем два консьюмера, один будет слушать сообщения по ключу 1, второй по ключу 2
    //         await jsm.consumers.add(setup.NATS_STREAM_NAME, {
    //             filter_subject: subject_1,
    //             durable_name: consumerName_1,
    //             ack_policy: AckPolicy.Explicit,
    //         })
    //         await jsm.consumers.add(setup.NATS_STREAM_NAME, {
    //             filter_subject: subject_2,
    //             durable_name: consumerName_2,
    //             ack_policy: AckPolicy.Explicit,
    //         })

    //         const consumer_1 = await jetstream.consumers.get(setup.NATS_STREAM_NAME, consumerName_1)
    //         const consumer_2 = await jetstream.consumers.get(setup.NATS_STREAM_NAME, consumerName_2)

    //         // Формируем транзакцию. Как формировать данные по газу смотреть в тесте на отправку ETH.
    //         const txUnsigned = {
    //             chainId: 1,
    //             to: wallet_2.address,
    //             from: wallet_1.address,
    //             value: amountInWei,
    //             nonce: await wallet_1.getTransactionCount(),
    //             type: 2,
    //             gasLimit: '21000',
    //             maxFeePerGas: new BigNumber(setup.DEFAULT_GAS_PRICE).multipliedBy(2).toFixed(0),
    //             maxPriorityFeePerGas: new BigNumber(setup.DEFAULT_GAS_PRICE).dividedBy(2).toFixed(0),
    //         }

    //         // Подписываем транзакцию
    //         const txSigned = await wallet_1.signTransaction(txUnsigned)

    //         // Отправляем подписанную транзакцию
    //         const txPending = await utils.natsRequest<EvmNatsControllerTypes.SendSignedTransaction.Result>(
    //             `rpc.v1.${setup.NATS_STREAM_NAME}.sendSignedTransaction`,
    //             { signedTransaction: txSigned },
    //         )(nc)

    //         // Ждем пока транзакция станет confirm
    //         await utils.mineWithDelay(provider, setup.CONFIRMATION_REQUIRED + 1)

    //         // Забираем все сообщения из консьюмеров
    //         const expected_1_1: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_1.next({ expires: 5000 })) as JsMsg)?.data)
    //         const expected_1_2: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_1.next({ expires: 5000 })) as JsMsg)?.data)
    //         const expected_1_3: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_1.next({ expires: 5000 })) as JsMsg)?.data)
    //         const expected_1_4: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_1.next({ expires: 5000 })) as JsMsg)?.data)

    //         const expected_2_1: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_2.next({ expires: 5000 })) as JsMsg)?.data)
    //         const expected_2_2: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_2.next({ expires: 5000 })) as JsMsg)?.data)
    //         const expected_2_3: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_2.next({ expires: 5000 })) as JsMsg)?.data)
    //         const expected_2_4: TestTransactionEvent = utils.decodeNatsMessage(((await consumer_2.next({ expires: 5000 })) as JsMsg)?.data)

    //         expect(expected_1_1.transactionPayload.hash).toEqual(txPending.hash)
    //         expect(expected_1_2.transactionPayload.hash).toEqual(txPending.hash)
    //         expect(expected_1_3.transactionPayload.hash).toEqual(txPending.hash)
    //         expect(expected_2_1.transactionPayload.hash).toEqual(txPending.hash)
    //         expect(expected_2_2.transactionPayload.hash).toEqual(txPending.hash)
    //         expect(expected_2_3.transactionPayload.hash).toEqual(txPending.hash)

    //         // Ожидаем сообщения в указанной последовательности.
    //         expect(expected_1_1.status).toEqual(TestTransactionStatus.PENDING)
    //         expect(expected_1_2.status).toEqual(TestTransactionStatus.UNCONFIRMED)
    //         expect(expected_1_3.status).toEqual(TestTransactionStatus.CONFIRMED)
    //         expect(expected_2_1.status).toEqual(TestTransactionStatus.PENDING)
    //         expect(expected_2_2.status).toEqual(TestTransactionStatus.UNCONFIRMED)
    //         expect(expected_2_3.status).toEqual(TestTransactionStatus.CONFIRMED)

    //         // В отличии от БТЦ, для разных адресов - разные сообщения
    //         expect(expected_1_1.address).toEqual(wallet_1.address.toLowerCase())
    //         expect(expected_1_2.address).toEqual(wallet_1.address.toLowerCase())
    //         expect(expected_1_3.address).toEqual(wallet_1.address.toLowerCase())
    //         expect(expected_2_1.address).toEqual(wallet_2.address.toLowerCase())
    //         expect(expected_2_2.address).toEqual(wallet_2.address.toLowerCase())
    //         expect(expected_2_3.address).toEqual(wallet_2.address.toLowerCase())

    //         // Поскольку транзакцию отправляли с адреса №1 на адрес №2, то для первого
    //         // в сообщении будет указанно что транзакция исходящая, а для второго входящая
    //         expect(expected_1_1.direction).toEqual(TestTransactionDirection.OUTGOING)
    //         expect(expected_1_2.direction).toEqual(TestTransactionDirection.OUTGOING)
    //         expect(expected_1_3.direction).toEqual(TestTransactionDirection.OUTGOING)
    //         expect(expected_2_1.direction).toEqual(TestTransactionDirection.INCOMING)
    //         expect(expected_2_2.direction).toEqual(TestTransactionDirection.INCOMING)
    //         expect(expected_2_3.direction).toEqual(TestTransactionDirection.INCOMING)

    //         // После сообщения о confirm транзакциях больше ничего по ней быть не должно
    //         expect(expected_1_4).toBeUndefined()
    //         expect(expected_2_4).toBeUndefined()
    //     })
    // })
})
