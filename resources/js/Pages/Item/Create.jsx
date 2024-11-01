import ContractHeader from "@/Componentss/contract/ContractHeader";
import AddItemCsv from "@/Componentss/item/AddItemCsv";
import AddItemSection from "@/Componentss/item/AddItemSection";
import ItemTabNavigation from "@/Componentss/item/ItemTabNavigation";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function AddContractPage({ auth, contract }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add Item
                </h2>
            }
        >
            <Head title="Item" />

            <ContractHeader contract={contract} />

            <div className="my-4">
                <ItemTabNavigation contractId={contract.id} />
            </div>

            <div className="my-2"></div>

            <Tabs defaultValue="form" >
                <TabsList className="grid grid-cols-2 max-w-[400px]">
                    <TabsTrigger value="form">Form</TabsTrigger>
                    <TabsTrigger value="csv">CSV</TabsTrigger>
                </TabsList>
                <TabsContent value="form">
                    <AddItemSection contract={contract} />
                </TabsContent>
                <TabsContent value="csv">
                    <AddItemCsv contract={contract} />
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
