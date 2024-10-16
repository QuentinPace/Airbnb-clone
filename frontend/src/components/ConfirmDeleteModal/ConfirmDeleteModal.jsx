import { useModal } from "../../context/Modal"

export default function ConfirmDeleteModal () {
    const { closeModal } = useModal()
    return (
        <h2>in the modal boiiiiii</h2>
    )
}