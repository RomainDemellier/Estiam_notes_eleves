<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<title>Evaluation des élèves</title>
	<meta charset="utf-8">
</head>
<body>
<?php 

	if(isset($_GET['code']) || isset($_POST['code'])){
		if(isset($_GET['code'])){
			$code = $_GET['code'];
		}
		if(isset($_POST['code'])){
			$code = $_POST['code'];
		}

		//echo $code;
		//echo $_POST['nom'];
		if(isset($_POST['valider'])){
			if(isset($_POST['nom']) && !empty($_POST['nom'])){
				$nom = "%" . $_POST['nom'] . "%";
			}
		}
	
 ?>
	<div class="container">
		<form action="" method="post" class="form-inline">
		<div class="row container">
			<div class="form-group col-md-4"><input type="text" name="nom" class="form-control" placeholder="Nom"></div>
			<div class="form-group col-md-4"><input type="text" name="prenom" class="form-control" placeholder="Prenom"></div>	
			<input type="hidden" name="code" value="<?php echo $code; ?>">
			<div class="form-group col-md-4"><button type="submit" name="valider" class="btn btn-primary filtre">Rechercher</button></div>
		</div>
			
			
		</form>
	</div>
<?php 
	
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=Noter_Eleves;charset=utf8', 'root', 'root');
	}
	catch(Exception $e)
	{
        die('Erreur : '.$e->getMessage());
	}
	/*if(!isset($prenom)){
		$reponse = $bdd->query('SELECT id_eleve, nom, prenom FROM eleve WHERE code_classe="'.$code.'"');
	} else {
		$reponse = $bdd->query('SELECT id_eleve, nom, prenom FROM eleve WHERE code_classe="'.$code.'" AND prenom LIKE "'.$prenom.'"');
	}*/
	$reponse = $bdd->query('SELECT id_eleve, nom, prenom FROM eleve WHERE code_classe="'.$code.'"');

	if(isset($nom)){
		$reponse2 = $bdd->query('SELECT id_eleve, nom, prenom FROM eleve WHERE code_classe="'.$code.'" AND nom LIKE "'.$nom.'"');
		while($donnees2 = $reponse2->fetch()){
			$tabNoms[] = $donnees2['nom']; 
		}
	}



?>
<div class="container">
	<table class="table table-striped table-bordered table-hover" id="tab_eleves">
		<thead>
			<tr>
				<td>Image</td>
				<td>Nom</td>
				<td>Prenom</td>
				<td class="header_note center nombre">Note</td>
				<td id="header_moyenne" class="nombre">Moyenne</td>
			</tr>
		</thead>
		<tbody>
<?php

	while($donnees = $reponse->fetch()){
		$id = $donnees['id_eleve'];
		$nom = $donnees['nom'];
		$prenom = $donnees['prenom'];
		/*echo "<tr>";
		echo "<td>" .$id. "</td>";
		echo "<td>" .$nom. "</td>";
		echo "<td>" .$prenom. "</td>";
		echo "<td class='cell_note'><input type='text' name='note' class='note'></td>";
		echo "<td class='cell_note moyenne'>" .$id. "</td>";
		echo "</tr>";*/
		//if($prenom == "Robert"){
		if(in_array($nom, $tabNoms)){
			//echo $prenom;
			?>
			<tr class="vert">
			<?php
		} else {
			//echo $prenom;
?>
	<tr>
<?php
	}
?>
		<td>
			<?php echo $id; ?>
		</td>
		<td>
			<?php echo $nom; ?>
		</td>
		<td>
			<?php echo $prenom; ?>
		</td>
		<td class="center nombre">
			<input type='text' name='note' class='note1 note' onblur="ajout_colonne()">
		</td>
		<td class="nombre">
			Moyenne
		</td>
	</tr>
<?php
	}
 ?>
 	</tbody>
 	</table>
 	</div>
 	<p class="centre"><button class="btn btn-info"  id="inser_cell">Insérer une colonne note</button></p>
 	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>
<?php } ?>