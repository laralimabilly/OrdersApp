import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button, Text, ListItem, Dialog, DialogActions, DialogContent, DialogHeader } from '@react-native-material/core';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNagivator';
import axiosInstance from '../../axiosConfig';

type OrdersScreenProps = StackScreenProps<RootStackParamList, 'Pedidos'>;

const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [error, setError] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('financeiro/faturas', {
                    params: {
                        pageIndex,
                        pageSize,
                    },
                });
                setOrders(response.data.list);
                setFilteredOrders(response.data.list);
                setTotalPages(response.data.totalPages);
                setPageSize(response.data.pageSize);
                setError('');
                setDialogVisible(false);
            } catch (error) {
                setError('Não foi possível obter a lista de pedidos. Tente novamente.');
                setDialogVisible(true);
                console.log(error);
            }
        };

        fetchOrders();
    }, [pageIndex]);

    const handleFilter = (text: string) => {
        setSearch(text);
        const filteredData = orders.filter(
        (order) =>
            order.pessoa.cpfCnpj.includes(text) ||
            order.pessoa.codigo.includes(text) ||
            order.pessoa.nome.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredOrders(filteredData);
    };

    const handleSelectOrder = (order: any) => {
        navigation.navigate('Pagamento', { orderData: order });
    };

    const handleNextPage = () => {
        if (pageIndex < totalPages) {
            setPageIndex(pageIndex + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Procure por CPF, Código ou Nome"
                value={search}
                onChangeText={handleFilter}
                style={styles.input}
            />
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.numeroFatura}
                renderItem={({ item }) => (
                <ListItem
                    title={item.historico}
                    secondaryText={`Preço: ${item.valorFatura}`}
                    onPress={() => handleSelectOrder(item)}
                />
                )}
            />
            <View style={styles.pagination}>
                <Button
                title="Prev"
                onPress={handlePreviousPage}
                disabled={pageIndex === 1}
                />
                <Text>{`Página ${pageIndex} de ${totalPages}`}</Text>
                <Button
                title="Próx"
                onPress={handleNextPage}
                disabled={pageIndex === totalPages}
                />
            </View>
            <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                <DialogHeader title="Ops!" />
                <DialogContent>
                    <Text>{error}</Text>
                </DialogContent>
                <DialogActions>
                    <Button
                        title="OK"
                        onPress={() => setDialogVisible(false)}
                        compact
                        variant="text"
                    />
                </DialogActions>
            </Dialog>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default OrdersScreen;

